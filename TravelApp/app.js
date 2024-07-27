const form = document.querySelector("#user-form")


form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const city = form.elements.city.value;

    const coordinates = await getLatLon(city);
    // console.log(coordinates.lat, " ", coordinates.lon)
    const topDestinations = await getTopDestinations(coordinates);
    // console.log(topDestinations);
    const destinationInfoDict = await getInfo(topDestinations);
    console.log(destinationInfoDict);
    appendDestinations(destinationInfoDict, city);
    const weather = await getWeather(coordinates.lat, coordinates.lon);
    console.log(weather);
    createWeatherHtml(coordinates.lat, coordinates.lon);

    form.elements.country.value = '';
    form.elements.arrivalDate.value = '';
    form.elements.city.value = '';

})

const getLatLon = async function (city) {
    const cityData = await axios.get(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`)
    const lat = await cityData.data[0].lat;
    const lon = await cityData.data[0].lon;
    return { lat: lat, lon: lon };
}

const getTopDestinations = async function (coordinates) {
    const topDesinationsParams = { params: { radius: 1000, lon: coordinates.lon, lat: coordinates.lat, apikey: "*****", limit: 9 } }
    const topDesinations = await axios.get("https://api.opentripmap.com/0.1/en/places/radius", topDesinationsParams)
    return topDesinations.data;
}

const getInfo = async function (topDestinations) {
    const destinationInfoDict = {};
    const destinationPromises = topDestinations.features.map(async function (element) {
        const destinationInfo = await axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${element.properties.xid}?apikey=******`);
        try {
            destinationInfoDict[destinationInfo.data.name] = destinationInfo.data.preview.source;
        } catch (e) {
            console.log("Source Image not available")
            delete destinationInfoDict[destinationInfo.data.name]
        }
    })

    await Promise.all(destinationPromises);

    const keys = Object.keys(destinationInfoDict);

    if (keys.length > 6) {
        for (i = keys.length; i > 5; i--) {
            console.log(i);
            const keyToRemove = keys[i];
            delete destinationInfoDict[keyToRemove];
        }
    }
    console.log(destinationInfoDict)
    return destinationInfoDict;
}

const appendDestinations = async function (destinationInfoDict, city) {
    const currentcity = city
    const divContainer = document.querySelector(".container");
    divContainer.innerHTML = '';
    for (const [name, image] of Object.entries(destinationInfoDict)) {
        const newh1 = document.createElement("h1");
        const newImg = document.createElement("IMG");
        const newDiv = document.createElement("div");
        const newPara = document.createElement("p")
        newh1.textContent = name;

        const getDescription = async function (currentcity, name) {
            const headers = {
                "Authorization": "****",
                "Content-Type": "application/json"
            }

            const body = {

                "inputs": `History of ${name}, ${currentcity}`,
                "parameters": {
                    "max_length": 270000000
                }

            }

            const response = await axios.post("https://api-inference.huggingface.co/models/eleutherai/gpt-neo-2.7B", body, { headers: headers });
            const result = await response.data
            return result[0].generated_text.split(",").slice(1).join(" ");
        }

        const description = await getDescription(currentcity, name);
        console.log(description);
        newPara.textContent = description;
        newImg.src = image;
        newDiv.append(newh1);
        newDiv.append(newImg);
        newDiv.append(newPara);
        console.log("New Elements created")
        divContainer.append(newDiv);
    }
    const top6title = document.querySelector(".top6title");
    top6title.style.display = "inline-block";
    divContainer.style.display = "grid";
}

const getWeather = async function (lat, lon) {
    const params = { lat: lat, lon: lon, appid: "******" }
    const response = await axios.post(`https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=${params.appid}&units=metric`)
    const result = await response.data
    return result
}

const createWeatherHtml = async function (lat, lon) {
    const weatherContainer = document.querySelector(".weather-container");
    weatherContainer.innerHTML = '';
    result = await getWeather(lat, lon);
    const weatherIcon = document.createElement("img");
    weatherIcon.src = `http://openweathermap.org/img/wn/${result.weather[0].icon}.png`

    const weatherDescription = document.createElement("p");
    weatherDescription.textContent = result.weather[0].description

    const weatherH2 = document.createElement("h2");
    weatherH2.textContent = "Weather Information"

    const weatherData = {
        "Temprature": `${result.main.temp}°C`,
        "Feels Like": `${result.main.feels_like}°C`,
        "Min Temprature": `${result.main.temp_max}°C`,
        "Max Temprature": `${result.main.temp_min}°C`,
        "Humidity": `${result.main.humidity}%`,
        "Wind Speed": `${result.wind.speed}meter/sec`
    }


    weatherContainer.append(weatherH2);
    weatherContainer.append(weatherIcon);
    weatherContainer.append(weatherDescription);

    for (const [k, v] of Object.entries(weatherData)) {
        const div = document.createElement("div");
        div.className = "weather-detail"
        const span = document.createElement("span");
        span.textContent = `${k}:`;
        const span2 = document.createElement("span");
        span2.textContent = v;
        div.append(span);
        div.append(span2);
        weatherContainer.append(div);
    }
    weatherContainer.style.display = "inline-block";


}




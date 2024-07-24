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

})

const getLatLon = async function (city) {
    const cityData = await axios.get(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`)
    const lat = await cityData.data[0].lat;
    const lon = await cityData.data[0].lon;
    return { lat: lat, lon: lon };
}

const getTopDestinations = async function (coordinates) {
    const topDesinationsParams = { params: { radius: 1000, lon: coordinates.lon, lat: coordinates.lat, apikey: "5ae2e3f221c38a28845f05b6bfca44b56408d8f3f3eb80053b9ea709", limit: 9 } }
    const topDesinations = await axios.get("https://api.opentripmap.com/0.1/en/places/radius", topDesinationsParams)
    return topDesinations.data;
}

const getInfo = async function (topDestinations) {
    const destinationInfoDict = {};
    const destinationPromises = topDestinations.features.map(async function (element) {
        const destinationInfo = await axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${element.properties.xid}?apikey=5ae2e3f221c38a28845f05b6bfca44b56408d8f3f3eb80053b9ea709`);
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
    for (const [name, image] of Object.entries(destinationInfoDict)) {
        const newh1 = document.createElement("h1");
        const newImg = document.createElement("IMG");
        const newDiv = document.createElement("div");
        const newPara = document.createElement("p")
        newh1.textContent = name;

        const getDescription = async function (currentcity, name) {
            const headers = {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            }

            const body = {

                "inputs": `History of ${name}, ${currentcity}`,
                "parameters": {
                    "max_length": 30
                }

            }

            const response = await axios.post("https://api-inference.huggingface.co/models/eleutherai/gpt-neo-2.7B", body, { headers: headers });
            const result = await response.data
            return result[0].generated_text
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
}
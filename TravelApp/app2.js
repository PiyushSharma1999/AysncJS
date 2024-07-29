const getWeather = async function (lat, lon) {
    const params = { lat: lat, lon: lon, appid: "******" };
    const response = await axios.post(`https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=${params.appid}`);
    return response.data;
}

async function weather() {
    const res = await getWeather(44.34, 10.99);
    console.log(res);
}

weather();

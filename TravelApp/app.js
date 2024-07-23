const form = document.querySelector("#travelDestination")

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const city = form.elements.city.value

    const cityData = await axios.get(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`)
    const lat = cityData.data[0].lat;
    const lon = cityData.data[0].lon;

    const topDesinationsParams = { params: { radius: 2000, lon: lon, lat: lat, apikey: "5ae2e3f221c38a28845f05b6bfca44b56408d8f3f3eb80053b9ea709", limit: 9 } }
    const topDesinations = await axios.get("https://api.opentripmap.com/0.1/en/places/radius", topDesinationsParams)
    console.log(topDesinations)
    getInfo(topDesinations)

})

// const destinationInfo = function (topDesinations) {
//     const destinationData = {}
//     const destinationInfo = axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=5ae2e3f221c38a28845f05b6bfca44b56408d8f3f3eb80053b9ea709`);
//     return destinationInfo.data;
// }

const getInfo = async function (topDestinations) {

    const destinationPromises = topDestinations.data.features.map(async (element) => {
        const newh1 = document.createElement("h1");
        const newImg = document.createElement("IMG");
        const newDiv = document.createElement("div")
        const divContainer = document.querySelector(".container")
        const destinationInfo = await axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${element.properties.xid}?apikey=5ae2e3f221c38a28845f05b6bfca44b56408d8f3f3eb80053b9ea709`);
        console.log(destinationInfo)
        console.log(destinationInfo.data.name, " ", destinationInfo.data.image, " ")
        newh1.textContent = destinationInfo.data.name;
        newImg.src = destinationInfo.data.preview.source
        newDiv.append(newh1)
        newDiv.append(newImg)
        divContainer.append(newDiv)

    });

    await Promise.all(destinationPromises);
}
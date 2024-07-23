// axios.get("https://swapi.dev/api/pesdasople/1/")
//     .then(res => {
//         console.log(res)
//     })
//     .catch((e) => {
//         console.log("ERROR! ", e)
//     })

// const getStarWarsPeople = async (id) => {
//     try {
//         const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
//         console.log(res.data);
//         const data = res.data;
//         return data;
//     }
//     catch (e) {
//         console.log(e)
//     }
// }

const jokes = document.querySelector("#jokes")

const getDadJokes = async () => {
    const config = { headers: { Accept: "application/json" } };
    const res = await axios.get("https://icanhazdadjoke.com", config);
    return res.data.joke;

}

const addNewJoke = async () => {
    try {
        const jokeText = await getDadJokes();
        const newli = document.createElement("li");
        newli.append(jokeText)
        jokes.append(newli)
    }
    catch (e) {
        const newli = document.createElement("li");
        newli.append("Sorry no new Jokes available :(")
        jokes.append(newli)
    }
}


const button = document.querySelector("button");
button.addEventListener('click', () => {
    addNewJoke();
})
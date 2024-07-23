// const fakeRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         const delay = Math.floor(Math.random() * 5000);
//         if (delay < 1000) {
//             setTimeout(() => {
//                 resolve("YOUR FAKE DATA HERE");
//             }, delay)
//         } else {
//             reject("REQUEST ERROR :(")
//         }
//     })
// }

// fakeRequest('/dogs/1')
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

delayedColorChange('violet', 1000)
    .then(() => delayedColorChange('indigo', 1000))
    .then(() => delayedColorChange('blue', 1000))
    .then(() => delayedColorChange('green', 1000))
    .then(() => delayedColorChange('yellow', 1000))
    .then(() => delayedColorChange('orange', 1000))
    .then(() => delayedColorChange('red', 1000))



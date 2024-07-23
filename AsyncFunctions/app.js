// const login = async (un, pass) => {
//     if (!un || !pass) throw 'Missing Credentials'
//     if (pass === 'password') return 'WELCOME'
//     throw 'Invalid Password'
// }

// login('a', 'password')
//     .then(msg => {
//         console.log(msg)
//     })
//     .catch(err => {
//         console.log("ERROR")
//         console.log(err)
//     })

// const delayedColorChange = (color, delay) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             document.body.style.backgroundColor = color;
//             resolve();
//         }, delay)
//     })
// }

// delayedColorChange('violet', 1000)
//     .then(() => delayedColorChange('indigo', 1000))
//     .then(() => delayedColorChange('blue', 1000))
//     .then(() => delayedColorChange('green', 1000))
//     .then(() => delayedColorChange('yellow', 1000))
//     .then(() => delayedColorChange('orange', 1000))
//     .then(() => delayedColorChange('red', 1000))


// async function rainbow() {
//     await delayedColorChange('violet', 100)
//     await delayedColorChange('indigo', 100)
//     await delayedColorChange('blue', 100)
//     await delayedColorChange('green', 100)
//     await delayedColorChange('yellow', 100)
//     await delayedColorChange('orange', 100)
//     await delayedColorChange('red', 100)
//     return "ALL DONE!"
// }

// rainbow().then((msg) => console.log(msg))

// async function printRainbow() {
//     let x = await rainbow();
//     console.log(x)
// }

// Async error handling

// const fakeRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         const delay = Math.floor(Math.random() * (4500)) + 500;
//         setTimeout(() => {
//             if (delay > 4000) {
//                 reject("Connection Timeout :(")
//             } else {
//                 resolve(`Here is your fake data ${url}`)
//             }
//         }, delay)
//     })
// }

// async function makeTwoRequest() {
//     try {
//         let data1 = await fakeRequest("/page1");
//         console.log(data1);
//         let data2 = await fakeRequest("/page2");
//         console.log(data2);
//     } catch (e) {
//         console.log("CAUGTH AN ERROR: ", e)
//     }
// }


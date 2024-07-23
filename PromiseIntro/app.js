const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject('Connection Timeout :(')
            } else {
                resolve(`Here is your data from ${url}`)
            }
        }, delay)
    })
}

fakeRequestPromise('yelp.com/api/Page1')
    .then((data) => {
        console.log("IT WORKED!! (page1)")
        console.log(data)
        return fakeRequestPromise('yelp.com/api/Page2')
    })
    .then((data) => {
        console.log("IT WORKED!! (page2)")
        console.log(data)
        return fakeRequestPromise('yelp.com/api/Page3')
    })
    .then((data) => {
        console.log("IT WORKED!! (page3)")
        console.log(data)
    })
    .catch((err) => {
        console.log("OH NO, A REQUEST FAILED!!!")
        console.log(err)
    })
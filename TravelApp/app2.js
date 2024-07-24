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

    return response.data
}

const getThat = async function () {
    const res = await getDescription("New York", "New York City Hall")
    console.log(res[0].generated_text)
}

getThat()
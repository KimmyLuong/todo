interface Messages {
    messages: Message[]
}

interface Message {
    name: string,
    message: string
}

async function getDBData(): Promise<Response> {
    const blah = await fetch('http://localhost:3000/v1/messages', {
        method: 'GET'
    })
    
    return await blah.json()
}

async function addData(data: Message) {
    console.log(data)
    const blah = await fetch('http://localhost:3000/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

async function deleteData(id: number) {
    const blah = await fetch('http://localhost:3000/v1/messages', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({id})
    })
}

export {
    getDBData,
    addData,
    deleteData
}
const express = require('express')
const res = require('express/lib/response')
const app = express()
const PORT = 3001


const persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "040-1241234"
    },
    {
        id: 3,
        name: "Mikael Ojanperä",
        number: "030-118911"
    },
    {
        id: 4,
        name: "Tommi Korpi",
        number: "331-11131231"
    },
]

app.use(express.json())

app.get("/api/persons", (req, res) =>{
    res.json(persons)
})

app.get("/info", (req, res) =>{
    res.write("<p>Phonebook has info for " + persons.length + " people</p>")
    res.write(Date())
    res.send()
})


app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const app = express()
const morgan = require("morgan")
const PORT = process.env.PORT || 3001
const cors = require("cors")

let persons = [
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

const getRand = () => Math.floor(Math.random() * 10000)

app.use(express.json())
app.use(cors())
// morgan custom format
app.use(
    morgan(function (tokens, req, res) {

        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            tokens.method(req) === "POST" ? JSON.stringify(req.body) : ""
        ].join(' ')
    })
)

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/info", (req, res) => {
    res.write("<p>Phonebook has info for " + persons.length + " people</p>")
    res.write(Date())
    res.send()
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})


app.post("/api/persons", (req, res) => {
    console.log(req.body)

    const content = req.body

    if (!content) {
        return res.status(400).json({
            error: "no content"
        })
    }

    if (!content.name || !content.number) {
        return res.status(400).json({
            error: "content missing values"
        })
    }

    if (persons.find(p => p.name === content.name)) {
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const newPerson = { ...req.body, id: getRand() }
    persons = persons.concat(newPerson)
    res.json(newPerson)

})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


const unknownMethod = (request, response) => {
    response.status(404).send({ error: 'unknown method' })
  }
  
  app.use(unknownMethod)
const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const Person = require("./models/person")
require('dotenv').config()

const app = express()
const morgan = require("morgan")
const PORT = process.env.PORT
const cors = require("cors")


const getRand = () => Math.floor(Math.random() * 10000)

app.use(express.json())
app.use(cors())
app.use(express.static("build"))

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

// get all people
app.get("/api/persons", (req, res) => {
    Person.find({}).then(p =>{
        console.log(p)
        res.json(p)
    })
})

// returns contact count + date
app.get("/info", (req, res) => {
    res.write("<p>Phonebook has info for " + persons.length + " people</p>")
    res.write(Date())
    res.send()
})

// return person on id
app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

// delete person
app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

// new person
app.post("/api/persons", (req, res) => {
    console.log(req.body)

    const content = req.body

    if (!content) {
        return res.status(400).json({
            error: "no content"
        })
    }

    

    const newPerson = new Person({
        name: content.name,
        number: content.number,
        id: getRand()
    })

    newPerson.save().then(person =>{
        res.json(person)
    })

})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


const unknownMethod = (request, response) => {
    response.status(404).send({ error: 'unknown method' })
  }
  
  app.use(unknownMethod)
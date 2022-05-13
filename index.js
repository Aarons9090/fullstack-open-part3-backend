const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const app = express()
const PORT = 3001


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

app.get("/api/persons", (req, res) =>{
    res.json(persons)
})

app.get("/info", (req, res) =>{
    res.write("<p>Phonebook has info for " + persons.length + " people</p>")
    res.write(Date())
    res.send()
})

app.get("/api/persons/:id", (req, res) =>{
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req,res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})


app.post("/api/persons", (req,res) =>{
    console.log(req.body)
    
    if(req.body.content){
        const newPerson = {...req.body, id: getRand()}
        persons = persons.concat(newPerson)
        res.json(newPerson)
    }else{
        return res.status(400).json({
            error: "content missing"
        })
    }
})


app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
const mongoose = require("mongoose")
require('dotenv').config()

const url = process.env.MONGODB_URI

console.log("connecting", url)
mongoose.connect(url)
.then(res => {
    console.log("connected succesfully")
})
.catch((err) =>{
    console.log("error:", err.message)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

// remove _id from mongodb object
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model("Person", personSchema)
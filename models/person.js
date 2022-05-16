const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.MONGODB_URI

console.log("connecting", url)
mongoose.connect(url)
    .then(() => {
        console.log("connected succesfully")
    })
    .catch((err) => {
        console.log("error:", err.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: function (v) {
                return /^\d{2,3}-\d{5,}/.test(v)
            },
            message: props => `${props.value} is not a valid number`
        },
        required: true
    },
    id: Number,
})

// remove _id from mongodb object
personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model("Person", personSchema)
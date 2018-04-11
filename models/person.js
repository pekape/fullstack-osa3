const mongoose = require('mongoose')

const url = 'mongodb://x:x@ds241489.mlab.com:41489/fullstack-osa3'

mongoose.connect(url)

const personSchema = new mongoose.Schema({ name: String, number: String })

personSchema.statics.format = person => ({
    name: person.name,
    number: person.number,
    id: person._id
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person

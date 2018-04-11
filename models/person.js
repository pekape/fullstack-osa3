const mongoose = require('mongoose')

const url = 'mongodb://user:password@ds241489.mlab.com:41489/fullstack-osa3'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person

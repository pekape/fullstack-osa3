const mongoose = require('mongoose')
const url = 'mongodb://user:password@ds241489.mlab.com:41489/fullstack-osa3'
mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const addPerson = () => {
  const name = process.argv[2]
  const number = process.argv[3]

  console.log(`lisätään henkilö ${name} numero ${number} luetteloon`)

  const person = new Person({ name, number })
  person
    .save()
    .then(response => mongoose.connection.close())
}

const printPeople = () => {
  console.log('puhelinluettelo:')
  Person
    .find({})
    .then(result => {
      result.forEach(person => console.log(person.name, person.number))
      mongoose.connection.close()
    })
}

if (process.argv.length === 4) {
  addPerson()
} else {
  printPeople()
}

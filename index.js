const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json())

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(people => {
      res.json(people.map(Person.format))
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/info', (req, res) => {
  res.send(`puhelinluettelossa on ${persons.length} henkilön tiedot
    <br /> ${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(Person.format(person))
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'virheellinen tunniste' })
    })
})

app.delete('/api/persons/:id', (req, res) => {
  Person
   .findByIdAndRemove(req.params.id)
   .then(result => {
     res.status(204).end()
   })
   .catch(error => {
     res.status(400).send({ error: 'virheellinen tunniste' })
   })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'nimi puuttuu' })
  }
  if (!body.number) {
    return res.status(400).json({ error: 'numero puuttuu' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPerson => {
      res.json(Person.format(savedPerson))
    })
    .catch(error => {
      console.log(error)
    })
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findOneAndUpdate({_id: req.params.id}, person, {new: true})
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(Person.format(updatedPerson))
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'virheellinen tunniste' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(morgan('tiny'))
app.use(bodyParser.json())

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`puhelinluettelossa on ${persons.length} henkilön tiedot
    <br /> ${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  person ?
  res.json(person) :
  res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'nimi puuttuu' })
  }
  if (!body.number) {
    return res.status(400).json({ error: 'numero puuttuu' })
  }
  if (persons.find(p => p.name === body.name)) {
    return res.status(409).json({ error: 'nimi on jo luettelossa' })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID()
  }

  persons = persons.concat(person)
  res.json(person)
})

const generateID = () => {
  return Math.floor(Math.random() * 1000000)
}

const PORT = 3001
app.listen(PORT, () => {
  console.log('bzzzzz')
})

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
]

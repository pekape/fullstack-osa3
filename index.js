const express = require('express')
const app = express()
const bodyParser = require('body-parser')

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

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'nimi tai numero puuttuu' })
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

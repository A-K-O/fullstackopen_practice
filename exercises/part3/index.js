const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

morgan.token('body_info', (request) => {
	return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] :response-time ms :body_info'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
	console.log(persons)
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const person = persons.find(person => person.id === request.params.id)

	if (!person) {
		response.status(404).end()
	} else {
		response.json(person)
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	persons = persons.filter(person => person.id !== id)
	response.status(204).end()
})

app.post('/api/persons', (request,response) => {
	const person = request.body
	person.id = Math.floor((Math.random() * 10000) + 4).toString()
	if (!person.name || !person.number) {
		response.status(422).end()
	}
	const dup = persons.find(({name}) => name === person.name)
	if (dup) {
		response.status(409).end()
	}
	persons = persons.concat(person)	
	console.log(person)
	response.json(person)

})


app.get('/info', (request, response) => {
	const datenow = new Date().toString();
	response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${datenow}</p>`)
})

app.get('/', (request, response) => {
	response.send('<p>Phonebook API</p>')
})
	

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

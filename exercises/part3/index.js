require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const Person = require('./models/person')
const cors = require('cors')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:', request.path)
	console.log('Body:', request.body)
	console.log('---')
	next()
}

app.use(requestLogger)

const unknownEndpoint = (request, response, next) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}	

	next(error)
}


morgan.token('body_info', (request) => {
	return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] :response-time ms :body_info'))

app.get('/api/persons', (request, response) => {
	Person.find({}).then(result => {
			response.json(result)
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(400).send({ error: 'malformatted id'})
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.patch('/api/persons/:id', (request, response, next) => {
	const { number } = request.body

	Person.findByIdAndUpdate(request.params.id, { number }, { new: true, runValidators: true, context: 'query' })
		.then(updatedPerson => {
			if (updatedPerson) {
				response.json(updatedPerson)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const { name, number } = request.body
	
	if(!name || !number) {
		return response.status(422).send({ error: 'missing fields' })
	}
	
	const person = new Person({ name, number })

	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
	.catch(error => next(error))
})

app.get('/info', (request, response, next) => {
	Person.countDocuments({})
		.then(result => {
			const datenow = new Date().toString();
			response.send(`<p>Phonebook has info for ${result} people</p><p>${datenow}</p>`)
		})
		.catch(error => next(error))
})

app.get('/', (request, response) => {
	response.send('<p>Phonebook API</p>')
})

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

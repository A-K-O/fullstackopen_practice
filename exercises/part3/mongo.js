const mongoose = require('mongoose')

//console.log(process.argv[0])
//console.log(process.argv[1])

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://aaarononate_db_user:${password}@fso-practice.cift8bq.mongodb.net`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 } )

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
	console.log('phonebook:')
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person)
		})
		mongoose.connection.close()
	})
} else {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4]
	})

	person.save().then(() => {
		console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
		mongoose.connection.close()
	})
}


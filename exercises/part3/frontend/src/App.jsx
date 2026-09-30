import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import "./index.css"


const App = () => {
	
	const [persons, setPersons] = useState([])
  	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newSearch, setNewSearch] = useState('')
	const [filtered, setFiltered] = useState([])
	const [notificationMessage, setNotificationMessage] = useState('')


	const handleDelete = id => {
		if (window.confirm("you sure u wanna delete this brodie?")) 
			personService
				.deletePerson(id)
				.then(() => {
					setPersons(persons.filter((person) => person.id !== id))
					setNotificationMessage(`some jit was deleted lol`)
					setTimeout(() => {
						setNotificationMessage("")}, 5000
					)
				})
				.catch(() => {
					setNotificationMessage("this jit was already deleted")
				})
	}

	useEffect(() => {
		personService
		.getAll()
		.then(initialList => {
			setPersons(initialList)
		})
	}, [])

  	return (
    	<div>
      		<h2>Phonebook</h2>
			<Notification message={notificationMessage} />
	  		<Filter persons={persons} newSearch={newSearch} setNewSearch={setNewSearch} setFiltered={setFiltered} />
	  		<h2>Add a new</h2>
	  		<PersonForm persons={persons} newName={newName} newNumber={newNumber} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} setNotificationMessage={setNotificationMessage}/>
      		<h2>Numbers</h2>
	  		<Persons persons={persons} filtered={filtered} newSearch={newSearch} handleDelete={handleDelete}/>
    	</div>
  )
}

export default App

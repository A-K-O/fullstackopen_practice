import personService from '../services/persons'

const handleNameChange = (event, setNewName) => {
	setNewName(event.target.value)	
}

const handleNumberChange = (event, setNewNumber) => {
	setNewNumber(event.target.value)
}


const addPerson = (event, persons, newName, newNumber, setPersons, setNewName, setNewNumber, setNotificationMessage) => {
	event.preventDefault()
	for(let i = 0; i < persons.length; i++) {
		if (persons[i].name.toLowerCase() === newName.toLowerCase()) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
			personService
					.updatePhoneNumber(newNumber, persons[i].id)
					.then(updated => {
						setPersons(persons.map(person => person.id == persons[i].id ? updated : person))
						setNewName("")
						setNewNumber("")
						setNotificationMessage("some jits number was updated")
						setTimeout(() => {
							setNotificationMessage("")}, 5000
							)
						}
					)}
			return
		}
	}
	const personObject = { 
		id: "",
		name: newName,
		number: newNumber
	}
	personService
		.create(personObject)
		.then(newObject => {
			setPersons(persons.concat(newObject))
			setNewName('')
			setNewNumber('')
			setNotificationMessage(`some jit was added lol`)
			setTimeout(() => {
				setNotificationMessage("")}, 5000
			)
		})
}

const PersonForm = ({persons, newName, newNumber, setPersons, setNewName, setNewNumber, setNotificationMessage}) => {
	return (
	<div>
		<form onSubmit={(event) => addPerson(event, persons, newName, newNumber, setPersons, setNewName, setNewNumber, setNotificationMessage)}>
			<div>
				name: <input 
						value={newName}
						onChange={(event) => handleNameChange(event, setNewName)}
						/>
			</div>
			<div>
				number: <input
							value={newNumber}
							onChange={(event) => handleNumberChange(event, setNewNumber)}
							/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	</div>
	)
}

export default PersonForm

const Person = ({person, handleDelete}) => {
	return <li>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></li>
	}

const Persons = ({persons, filtered, newSearch, handleDelete}) => {
	if (newSearch === '') {
		return (
			<ul>
					{persons.map(person => <Person key={person.id} person={person} handleDelete={handleDelete}/>)}
			</ul>
		)
	}
	return (
		<ul>
			{filtered.map(person => <Person key={person.id} person={person} handleDelete={handleDelete}/>)}
		</ul>
	)
}

export default Persons

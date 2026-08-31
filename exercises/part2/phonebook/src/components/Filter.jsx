const handleSearchChange = (event, persons, setNewSearch, setFiltered) => {
	setNewSearch(event.target.value)
	setFiltered(persons.filter((el) => el.name.toLowerCase().includes(event.target.value.toLowerCase())))
}

const Filter = ({persons, newSearch, setNewSearch, setFiltered}) => {
	return (
		<div>
			filter shown with <input
								value={newSearch}
								onChange={(event) => handleSearchChange(event, persons, setNewSearch, setFiltered)}
								/>	
		</div>
	)
}

export default Filter

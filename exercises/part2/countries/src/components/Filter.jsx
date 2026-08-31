const handleQueryChange = (event, setQuery, countries, setFilteredCountries) => {
	setQuery(event.target.value)
	setFilteredCountries(countries.filter((country) => country.name.common.toLowerCase().includes(event.target.value.toLowerCase().trimEnd())))
	}

const Filter = ({countries, query, setQuery, setFilteredCountries}) => {
	 return (
			<div>
				find countries <input
									value={query}
									onChange={(event) => handleQueryChange(event, setQuery, countries, setFilteredCountries)}
								/>
			</div>
	 )
}

export default Filter

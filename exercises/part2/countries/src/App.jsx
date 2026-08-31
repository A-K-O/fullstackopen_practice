import { useEffect, useState } from "react"
import countryService from './services/countries'
import Filter from "./components/Filter"
import Countries from "./components/Countries"

const App = () => {

	const [query, setQuery] = useState("")
	const [countries, setCountries] = useState([])
	const [filteredCountries, setFilteredCountries] = useState(countries)
	useEffect(() => {
		countryService
			.getCountries()
			.then(initialList => {
				setCountries(initialList)
			})
	}, [])

	console.log(countries)

	return (
		<div>
			<Filter countries={countries} query={query} setQuery={setQuery} setFilteredCountries={setFilteredCountries} />
			<Countries filteredCountries={filteredCountries} />
		</div>
	)
}

export default App

import CountrySimple from './CountrySimple'
import CountryDetailed from './CountryDetailed'

const Countries = ({filteredCountries}) => {
	let length = filteredCountries.length
	
	if (length === 250) {
		return null
	} else if (length > 10) {
		return <p>Too many matches, specify another filter</p>
	} else if (length > 2) {
		return (
			<div>
				{filteredCountries.map(country => <CountrySimple key={country.name.common}country={country}/>)}
			</div>
		)
	} else if (length === 1) {
		return (
			<div>
				{filteredCountries.map(country => <CountryDetailed key={country.name.common}country={country} />)}
			</div>
				)
	} 
}

export default Countries

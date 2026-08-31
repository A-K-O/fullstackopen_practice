import Weather from "./Weather"

const CountryDetailed = ({country}) => {
	return (
		<div>
			<h1>{country.name.common}</h1>
			<p>Captial {country.capital}</p>
			<p>Area {country.area}</p>
			<h2>Languages</h2>
			<ul>
				{Object.values(country.languages).map(language=> <li key={language}>{language}</li>)}	
			</ul>
			<img src={country.flags.svg} alt={country.name} />
			<Weather country={country} />
		</div>
				)
}

export default CountryDetailed

import { useState, useEffect } from 'react'
import WeatherService from '../services/weather'

const Weather = ({country}) => {

	const [weatherData, setWeatherData] = useState({})
	const [temperature, setTemperature] = useState("")
	const [wind, setWind] = useState("")

	useEffect(() => {
		WeatherService
			.getWeather(country.latlng[0], country.latlng[1])
			.then(data => {
				setWeatherData(data)
				//setTemperature(weatherData.main.temp)
				//setWind(weatherData.wind.speed)
			})
	}, [])

	console.log(weatherData.timezone)
					
	return (
		<div>
			<h2>Weather in {country.name.common}</h2>
		</div>
	)	
}

export default Weather

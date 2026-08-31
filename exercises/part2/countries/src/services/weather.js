import axios from "axios"
const api_key = import.meta.env.VITE_WEATHER_KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getWeather = (lat, lon) => {
	const fullUrl = `${baseUrl}lat=${lat}&lon=${lon}&appid=${api_key}`
	const request = axios.get(fullUrl)
	return request.then(response => response.data)
}

export default { getWeather }

import { useState } from "react"
import CountryDetailed from "./CountryDetailed"

const CountrySimple = ({country}) => {
	const [isVisible, setIsVisible] = useState(false)

	const toggleVisibility = () => {
		setIsVisible(!isVisible)
	}

	return (
		<div>
			<p>
				{country.name.common}<button 
										onClick={toggleVisibility}>
											{isVisible ? 'hide' : 'show'}
										</button>
			</p>
			{isVisible && <CountryDetailed country={country} />}
		</div>
	)
}

export default CountrySimple
	

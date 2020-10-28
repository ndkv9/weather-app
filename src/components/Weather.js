import React from 'react'

const Weather = ({ city }) => {
	if (!city) {
		return null
	}

	if (!city.found) {
		return <div>not found...</div>
	}

	return (
		<div>
			<div className='location-container'>
				<div className='location'>
					{city.data.name}, {city.data.sys.country}
				</div>
			</div>
			<div className='weather-container'>
				<div className='temperature'>{Math.round(city.data.main.temp)}°C</div>
				<div className='weather'>{city.data.weather[0].main}</div>
			</div>
		</div>
	)
}

export default Weather

import React, { useState, useEffect } from 'react'
import Weather from './components/Weather'
import Notification from './components/Notification'
import Footer from './components/Footer'
import { format } from 'date-fns'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API
let timeoutID

const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
    setValue,
  }
}

const useCity = name => {
  const [city, setCity] = useState(null)
  const [noti, setNoti] = useState(null)

  useEffect(() => {
    name &&
      axios
        .get(`${API_URL}${name}`)
        .then(response => {
          setCity({ found: true, data: response.data })
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          setCity({ found: false, data: {} })
          if (timeoutID) {
            clearTimeout(timeoutID)
          }
          setNoti('there is no result')
          timeoutID = setTimeout(() => setNoti(null), 3000)
        })
  }, [name])

  return { city, noti }
}

const getDate = () => {
  const today = format(new Date(), 'ccc, MMM dd yyyy')
  return today
}

const App = () => {
  const { setValue, ...inputName } = useField('text')
  const [name, setName] = useState('')
  const { city, noti } = useCity(name)

  const handleSubmit = event => {
    event.preventDefault()
    setName(inputName.value)
    setValue('')
  }

  return (
    <div
      className={
        city && typeof city.data.main !== 'undefined'
          ? city.data.main.temp > 18
            ? 'App hot'
            : 'App cold'
          : 'App'
      }
    >
      <main>
        <div className='header'>Weather App</div>
        <div className='date'>{getDate()}</div>
        <div className='search-container'>
          <form onSubmit={handleSubmit}>
            <input
              {...inputName}
              placeholder="enter city's name..."
              className='search-bar'
            />
            <button type='submit' className='search-btn'>
              Go
            </button>
          </form>
        </div>

        <Notification noti={noti} />

        {city && typeof city.data.main !== 'undefined' && (
          <Weather city={city} />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App

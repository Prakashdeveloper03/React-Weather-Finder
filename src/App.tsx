import React, { useState } from 'react'
import './App.css'

const App: React.FC = () => {
  const [apiKey] = useState<string>('YOUR_API_KEY')
  const [query, setQuery] = useState<string>('')
  const [weather, setWeather] = useState<Record<string, any>>({})

  const fetchWeather = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${apiKey}`
        )
        const data = await res.json()
        setWeather(data)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const dateBuilder = () => {
    const d = new Date()
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    const day = days[d.getDay()]
    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div
      id='app'
      className={
        typeof weather.main !== 'undefined' && weather.main.temp > 16
          ? 'warm'
          : ''
      }
    >
      <main className='min-h-screen py-25 bg-gradient-to-b'>
        <br />
        <div className='w-full flex justify-center items-center h-full'>
          <input
            type='text'
            className='block w-1/2 py-3 px-3 text-lg text-gray-800 rounded-full shadow-md bg-opacity-50 hover:bg-opacity-75 focus:outline-none focus:bg-opacity-75'
            placeholder='Search...'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={fetchWeather}
          />
        </div>
        <br />

        {typeof weather.main !== 'undefined' && (
          <div>
            <div className='text-center'>
              <div className='text-white text-2xl font-medium text-center text-shadow-lg'>
                {`${weather.name}, ${weather.sys.country}`}
              </div>
              <div className='text-white text-lg font-italic text-center'>
                {dateBuilder()}
              </div>
            </div>

            <div className='text-center'>
              <div className='inline-block py-10 px-25 text-7xl font-bold text-white text-shadow-lg bg-opacity-25 rounded-full shadow-md'>
                {`${Math.round(weather.main.temp)}°c`}
              </div>
              <div className='text-white text-4xl font-bold italic text-shadow-lg'>
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

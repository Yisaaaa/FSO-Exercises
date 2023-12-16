import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"

const App = () => {

  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
    axios.get(baseUrl)
      .then(response => setAllCountries(response.data))
      .catch(error => console.log("There was an error.", error))

  }, [])

  const [filter, setFilter] = useState("")
  const [countriesFound, setCountriesFound] = useState([])

  function filterAllCountries() {
    const filteredCountries = allCountries.filter(country => {
      const commonName = country.name.common.toLowerCase();
      const officialName = country.name.official.toLowerCase();

      const loweredFilter = filter.toLowerCase()

      if (commonName.includes(loweredFilter) || officialName.includes(loweredFilter)) {
        return country
      }
    })

    setCountriesFound(filteredCountries)
  }

  useEffect(() => {

    const timeoutId = setTimeout(() => {
      filterAllCountries()
    }, 2000)

    return () => { clearTimeout(timeoutId) }

  }, [filter])

  let countriesToShow;

  if (countriesFound.length === 1) {
    let country = countriesFound[0]

    countriesToShow = (
      <div>
        <h2 className="text-4xl font-bold mb-5">
          {country.name.official}
        </h2>
        <p className="text-base">Capital is {country.capital[0]}</p>
        <p className="text-4xl">{country.flag}</p>
      </div>
    )
  } else if (countriesFound.length > 10) {
    countriesToShow = "There are too many matches, specify your search."
  } else {
    countriesToShow = countriesFound.map(country => <p>{country.name.official}</p>)
  }

  return (
    <div className="p-4">
      <h1 className="text-gray-800 text-5xl font-bold mb-4">
        Countries
      </h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex gap-2 items-center">
        <label htmlFor="findCountry"
          className="text-xl"
        >Find country</label>
        <input
          type="text"
          id="findCountry"
          value={filter}
          className="border-2 border-gray-800"
          onChange={(e) => setFilter(e.target.value)}
        />
      </form>

      <div>
        {countriesToShow}
      </div>

    </div>
  )
}

export default App

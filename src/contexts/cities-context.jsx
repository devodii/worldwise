/* eslint-disable react/prop-types */
import * as React from "react"

const BASE_URL = "http://localhost:8000"

const CitiesContext = React.createContext()

function CitiesProvider({ children }) {
  const [cities, setCities] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const [currentCity, setCurrentity] = React.useState({})

  React.useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const cities = await res.json()

        setCities(cities)
      } catch (error) {
        alert("there was an error loading this data...")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  async function getCity(id) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const city = await res.json()

      setCurrentity(city)
    } catch (error) {
      alert("there was an error loading this data...")
    } finally {
      setIsLoading(false)
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      setCities(cities => [...cities, data])
    } catch (error) {
      alert("error creating city!")
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      })
      setCities(cities => cities.filter(city => city.id !== id))
    } catch (error) {
      alert("error deleting city!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const value = React.useContext(CitiesContext)

  if (value === undefined) {
    throw new Error("cities context must be used within it's prrovider!")
  }

  return value
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities }

/* eslint-disable react/prop-types */
import * as React from "react"

const BASE_URL = "http://localhost:8000"

const CitiesContext = React.createContext()

function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case "loading":
      return { ...state, isLoading: true }

    case "cities/loaded":
      return { ...state, isLoading: false, cities: payload }

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, payload],
        currentCity: payload,
      }

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== payload),
      }

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: payload }

    case "rejected":
      alert(payload)
      return { ...state, isLoading: false, error: payload }

    default:
      throw new Error("action not found!")
  }
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
}

function CitiesProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { isLoading, cities, currentCity, error } = state

  React.useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" })
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const cities = await res.json()

        dispatch({ type: "cities/loaded", payload: cities })
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        })
        alert("there was an error loading this cities...")
      }
    }
    fetchCities()
  }, [])

  const getCity = React.useCallback(
    async function getCity(id) {
      if (id === currentCity.id) return

      dispatch({ type: "loading" })

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const city = await res.json()
        dispatch({ type: "city/loaded", payload: city })
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading this city...",
        })
      }
    },
    [currentCity.id]
  )

  async function createCity(newCity) {
    dispatch({ type: "loading" })

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      dispatch({ type: "city/created", payload: data })
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating this city...",
      })
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" })
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      })
      dispatch({ type: "city/deleted", payload: id })
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting this city...",
      })
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        error,
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

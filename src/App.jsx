import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Pricing } from "./pages/pricing"
import { Product } from "./pages/product"
import { FourOhFour } from "./pages/404"
import { Homepage } from "./pages/homepage"
import { AppLayout } from "./pages/app-layout"
import { Login } from "./pages/login"
import { CityList } from "./components/city-list"
import { City } from "./components/city"
import { CountryList } from "./components/country-list"

const BASE_URL = "http://localhost:8000"

function App() {
  const [cities, setCities] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<h2>Form component</h2>} />
        </Route>
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="*" element={<FourOhFour />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

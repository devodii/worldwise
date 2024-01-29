import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { City } from "./components/city"
import { CityList } from "./components/city-list"
import { CountryList } from "./components/country-list"
import { Form } from "./components/form"
import { CitiesProvider } from "./contexts/cities-context"
import { FourOhFour } from "./pages/404"
import { AppLayout } from "./pages/app-layout"
import { Homepage } from "./pages/homepage"
import { Login } from "./pages/login"
import { Pricing } from "./pages/pricing"
import { Product } from "./pages/product"

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate replace to={"cities"} />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  )
}

export default App

import * as React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { AuthProvider } from "./contexts/auth-context"
import { CitiesProvider } from "./contexts/cities-context"
import { ProtectedRoutes } from "./pages/protected-route"

import { City } from "./components/city"
import { CityList } from "./components/city-list"
import { CountryList } from "./components/country-list"
import { Form } from "./components/form"
import SpinnerFullPage from "./components/spinner-full-page"

const FourOhFour = React.lazy(() => import("./pages/404"))
const AppLayout = React.lazy(() => import("./pages/app-layout"))
const Homepage = React.lazy(() => import("./pages/homepage"))
const Login = React.lazy(() => import("./pages/login"))
const Pricing = React.lazy(() => import("./pages/pricing"))
const Product = React.lazy(() => import("./pages/product"))

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <React.Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
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
          </React.Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App

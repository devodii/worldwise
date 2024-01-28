import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Pricing } from "./pages/pricing"
import { Product } from "./pages/product"
import { FourOhFour } from "./pages/404"

import { Homepage } from "./pages/homepage"
import { AppLayout } from "./pages/app-layout"
import { Login } from "./pages/login"
import { CityList } from "./components/city-list"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<CityList />} />
          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<h2>Hello from countries</h2>} />
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

import * as React from "react"
import { useAuth } from "../contexts/auth-context"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth()

  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  return isAuthenticated ? children : null
}

/* eslint-disable react/prop-types */
import * as React from "react"

const AuthContext = React.createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
}

function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case "login":
      return { ...state, user: payload, isAuthenticated: true }
    case "logout":
      return { ...state, user: null, isAuthenticated: false }

    default:
      throw new Error("unknown action!")
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
}

function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const { user, isAuthenticated } = state

  function logIn(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER })
    }
  }

  function logOut() {
    dispatch({ type: "logout" })
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error("this context cannot be used outside of it's Provider")
  }

  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth }

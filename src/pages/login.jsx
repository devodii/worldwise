import * as React from "react"
import styles from "./login.module.css"
import { Navigation } from "../components/navigation"
import { Button } from "../components/button"
import { useAuth } from "../contexts/auth-context"
import { useNavigate } from "react-router-dom"

export function Login() {
  const [email, setEmail] = React.useState("jack@example.com")
  const [password, setPassword] = React.useState("qwerty")

  const navigate = useNavigate()

  const { logIn, isAuthenticated } = useAuth()

  function handleLogin(e) {
    e.preventDefault()

    logIn(email, password)
  }

  React.useEffect(() => {
    function redirect() {
      if (isAuthenticated) {
        navigate("/app", { replace: true })
      }
    }
    redirect()
  }, [isAuthenticated, navigate])

  return (
    <main className={styles.login}>
      <Navigation />

      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="submit" style={{ color: "black" }}>
            Login
          </Button>
        </div>
      </form>
    </main>
  )
}

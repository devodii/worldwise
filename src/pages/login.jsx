import * as React from "react"
import styles from "./login.module.css"
import { Navigation } from "../components/navigation"

export function Login() {
  const [email, setEmail] = React.useState("jack@example.com")
  const [password, setPassword] = React.useState("qwerty")

  return (
    <main className={styles.login}>
      <Navigation />

      <form className={styles.form}>
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
          <button>Login</button>
        </div>
      </form>
    </main>
  )
}

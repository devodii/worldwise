import { NavLink } from "react-router-dom"
import { Logo } from "./logo"
import styles from "./navigation.module.css"

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/app">Go to the app</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>

        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

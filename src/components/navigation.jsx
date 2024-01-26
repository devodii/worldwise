import { Link, NavLink } from "react-router-dom"
import styles from "./navigation.module.css"

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <div>
        <Link to="/">Worldwse</Link>
      </div>

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

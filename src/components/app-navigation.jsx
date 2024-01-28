import { NavLink } from "react-router-dom"
import styles from "./app-navigation.module.css"

export function AppNavigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  )
}

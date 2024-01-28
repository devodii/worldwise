import { Outlet } from "react-router-dom"
import { AppNavigation } from "./app-navigation"
import { Logo } from "./logo"
import styles from "./sidebar.module.css"

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavigation />


      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  )
}

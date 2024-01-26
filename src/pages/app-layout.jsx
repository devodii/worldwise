import { Map } from "../components/map"
import { Sidebar } from "../components/sidebar"
import styles from "./app-layout.module.css"

export function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  )
}

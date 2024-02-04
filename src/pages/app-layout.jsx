import * as React from "react"

import { Sidebar } from "../components/sidebar"
import { User } from "../components/user"
import styles from "./app-layout.module.css"

const Map = React.lazy(() => import("../components/map"))

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <React.Suspense fallback={<div>Loading maps...</div>}>
        <Map />
      </React.Suspense>

      <User />
    </div>
  )
}

import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./map.module.css"

export function Map() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>

      <button
        onClick={() => {
          setSearchParams(prev => ({ ...prev, lat: 23 }))
        }}
      >
        Change position
      </button>
    </div>
  )
}

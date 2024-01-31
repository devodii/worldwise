import * as React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useCities } from "../contexts/cities-context"
import styles from "./map.module.css"
import {
  Marker,
  Popup,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet"

export function Map() {
  const [searchParams] = useSearchParams()

  const mapLatitude = searchParams.get("lat") || 40
  const mapLongitude = searchParams.get("lng") || 0

  const [mapPosition, setMapPosition] = React.useState([40, 0])

  const { cities } = useCities()

  React.useEffect(() => {
    function updateView() {
      if (mapLongitude && mapLatitude) {
        setMapPosition([mapLatitude, mapLongitude])
      }
    }
    updateView()
  }, [mapLatitude, mapLongitude])

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

// eslint-disable-next-line react/prop-types 
function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)

  return null
}

function DetectClick() {
  const navigate = useNavigate()
  useMapEvents({ click: () => navigate("form") })
}

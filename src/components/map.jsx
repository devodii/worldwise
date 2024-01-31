import * as React from "react"
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet"
import { useNavigate } from "react-router-dom"
import { useCities } from "../contexts/cities-context"
import { useGeolocation } from "../hooks/useGeolocation"
import { useUrlPosition } from "../hooks/useUrlPosition"
import { Button } from "./button"
import styles from "./map.module.css"

export function Map() {
  const {
    getPosition,
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
  } = useGeolocation()

  const { cities } = useCities()
  const { latitude, longitude } = useUrlPosition()
  const [mapPosition, setMapPosition] = React.useState([40, 0])

  React.useEffect(() => {
    function updateView() {
      if (longitude && latitude) {
        setMapPosition([latitude, longitude])
      }
    }
    updateView()
  }, [latitude, longitude])

  React.useEffect(() => {
    function main() {
      if (geoLocationPosition) {
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
      }
    }
    main()
  }, [geoLocationPosition])

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
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
  useMapEvents({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  })
}

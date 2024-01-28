/* eslint-disable react/prop-types */
import { CityItem } from "./city-item"
import { Message } from "./message"
import styles from "./city-list.module.css"
import { Spinner } from "./spinner"

export function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />

  if (cities.length < 1)
    return (
      <Message message="Add your first city byclicking on a city on the map" />
    )

  return (
    <ul className={styles.cityList}>
      {cities?.map(city => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  )
}

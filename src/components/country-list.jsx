/* eslint-disable react/prop-types */
import { CountryItem } from "./country-item"
import styles from "./country-list.module.css"
import { Message } from "./message"
import { Spinner } from "./spinner"

export function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />
  console.log({ cities })

  if (cities.length < 1)
    return (
      <Message message="Add your first city byclicking on a city on the map" />
    )

  const countries = cities.reduce((arr, city) => {
    if (!arr.map(el => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }]
    } else {
      return arr
    }
  }, [])

  console.log({ countries })

  return (
    <ul className={styles.cityList}>
      {countries?.map(country => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  )
}

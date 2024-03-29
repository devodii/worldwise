/* eslint-disable no-unused-vars */
import { useParams, useSearchParams } from "react-router-dom"
import * as React from "react"
import { useCities } from "../contexts/cities-context"
import styles from "./city.module.css"
import { Spinner } from "./spinner"
import { BackButton } from "./back-button"

const formatDate = date =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date))

export function City() {
  const { currentCity, getCity, isLoading } = useCities()

  const { cityName, emoji, date, notes } = currentCity

  const { id } = useParams()

  const [searchParams, setSearchParams] = useSearchParams()

  React.useEffect(() => {
    function mounted() {
      getCity(id)
    }
    mounted()
  }, [id, getCity])

  // return <h1>CITY! {id}</h1>

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  )
}

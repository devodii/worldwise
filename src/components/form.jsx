import * as React from "react"

import { BackButton } from "./back-button"
import { Button } from "./button"
import styles from "./form.module.css"
import { useUrlPosition } from "../hooks/useUrlPosition"
import { Message } from "./message"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import { useCities } from "../contexts/cities-context"

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"
export function Form() {
  const { latitude, longitude } = useUrlPosition()
  const { createCity } = useCities()

  const [cityName, setCityName] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [date, setDate] = React.useState(new Date())
  const [notes, setNotes] = React.useState("")
  const [_isLoadingGeoCoding, setIsLoadingGeoCoding] = React.useState(true)
  const [geoCodingError, setGeoCodingError] = React.useState("")

  const [emoji, setEmoji] = React.useState("")

  React.useEffect(() => {
    async function fetchCityData() {
      if (!latitude || !longitude) return

      try {
        setIsLoadingGeoCoding(true)
        setGeoCodingError("")

        const res = await fetch(
          `${BASE_URL}?latitude=${latitude}&longitude=${longitude}`
        )
        const data = await res.json()

        if (!data.countryCode) {
          throw new Error(
            "that doesn't seem to be a city, click somewhere else!"
          )
        }
        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))

        console.log({ data })
      } catch (error) {
        setGeoCodingError(error.message)
        console.log(error)
      } finally {
        setIsLoadingGeoCoding(false)
      }
    }

    fetchCityData()
  }, [latitude, longitude])

  function handleSubmit(e) {
    e.preventDefault()

    if (!cityName || !date) return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: latitude,
        lng: longitude,
      },
    }

    createCity(newCity)
  }

  if (!latitude || !longitude) {
    return <Message message="Start by clicking somewhere on the map" />
  }

  if (geoCodingError) {
    return <Message message={geoCodingError} />
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={date => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  )
}

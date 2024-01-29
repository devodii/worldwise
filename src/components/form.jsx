// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import * as React from "react"

import styles from "./form.module.css"
import { Button } from "./button"
import { useNavigate } from "react-router-dom"
import { BackButton } from "./back-button"

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

export function Form() {
  const [cityName, setCityName] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [date, setDate] = React.useState(new Date())
  const [notes, setNotes] = React.useState("")

  const navigate = useNavigate()

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input id="date" onChange={e => setDate(e.target.value)} value={date} />
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
        <Button>Add</Button>
        <BackButton />
      </div>
    </form>
  )
}

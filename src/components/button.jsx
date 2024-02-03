/* eslint-disable react/prop-types */
import styles from "./button.module.css"

export function Button({ children, onClick, type = "primary", ...props }) {
  // type => primary | back | position
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type] ?? ""}`}
      {...props}
    >
      {children}
    </button>
  )
}

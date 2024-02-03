import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/auth-context"
import styles from "./user.module.css"

export function User() {
  const navigate = useNavigate()

  const { logOut, user } = useAuth()

  function handleClick() {
    logOut()
    navigate("/")
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  )
}

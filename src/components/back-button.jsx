import { useNavigate } from "react-router-dom"
import { Button } from "./button"

export function BackButton(props) {
  const navigate = useNavigate()
  return (
    <Button
      type="back"
      onClick={e => {
        e.preventDefault()
        navigate(-1)
      }}
      {...props}
    >
      &larr; Back
    </Button>
  )
}

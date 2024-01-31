import { useSearchParams } from "react-router-dom"

export function useUrlPosition() {
  const [searchParams] = useSearchParams()
  const latitude = searchParams.get("lat") || 40
  const longitude = searchParams.get("lng") || 0

  return { latitude, longitude }
}

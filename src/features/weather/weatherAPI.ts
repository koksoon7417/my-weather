import { CurrentWeatherType, LocationType } from "./weather.type"

const baseUrl = "https://api.openweathermap.org/data/2.5"
const appKey = import.meta.env.VITE_API_KEY

export const getWeather = ({ city, country }: LocationType) => {
  const queryParams = [city, country].join(",")

  return new Promise<CurrentWeatherType>((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.open(
      "GET",
      `${baseUrl}/weather?q=${queryParams}&appid=${appKey}&units=metric`,
    )
    req.onload = () =>
      req.status === 200
        ? resolve(JSON.parse(req.response))
        : reject(Error(req.statusText))
    req.onerror = (e) => reject(Error(`Network Error: ${e}`))
    req.send()
  })
}

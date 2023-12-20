export interface LocationType {
  city: string
  country: string
}

export interface CurrentWeatherType {
  name: string
  sys: {
    country: string
  }
  main: {
    temp: number
    temp_max: number
    temp_min: number
    humidity: number
  }
  weather: [
    {
      description: string
      icon: string
    },
  ]
  created_at: Date
}

export interface WeatherState {
  status: "idle" | "loading" | "failed"
  currentWeather: CurrentWeatherType
  searchHistory: CurrentWeatherType[]
}

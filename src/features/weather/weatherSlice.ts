import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../../app/store"
import { getWeather } from "./weatherAPI"
import { CurrentWeatherType, WeatherState } from "./weather.type"

const localHistory = JSON.parse(
  localStorage.getItem("searchHistory") || "[]",
) as CurrentWeatherType[]

const initWeather =
  localHistory.length > 0
    ? localHistory[0]
    : ({
        name: "Tampines Estate",
        sys: {
          country: "SG",
        },
        main: {
          temp: 0,
          temp_max: 0,
          temp_min: 0,
          humidity: 0,
        },
        weather: [{ description: "clear sky", icon: "01d" }],
        created_at: new Date(),
      } as CurrentWeatherType)

const initialState: WeatherState = {
  status: "idle",
  currentWeather: initWeather,
  searchHistory: localHistory || [],
}

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (location: { city: string; country: string }) => {
    const weather = await getWeather(location)

    return {
      ...weather,
      created_at: new Date(),
    }
  },
)

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    deleteSelectedHistory: (state, action: PayloadAction<number>) => {
      state.searchHistory.splice(action.payload, 1)
      localStorage.setItem("searchHistory", JSON.stringify(state.searchHistory))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "idle"
        state.currentWeather = action.payload

        // Add to history and save in local storage
        if (state.searchHistory.length > 4) state.searchHistory.pop()
        state.searchHistory.unshift(action.payload)
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(state.searchHistory),
        )
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { deleteSelectedHistory } = weatherSlice.actions

export const selectWeatherStatus = (state: RootState) => state.weather.status
export const selectCurrentWeather = (state: RootState) =>
  state.weather.currentWeather
export const selectWeatherHistory = (state: RootState) =>
  state.weather.searchHistory

export default weatherSlice.reducer

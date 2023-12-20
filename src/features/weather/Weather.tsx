import { useState, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import { MdClear, MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md"
import { ImBin2 } from "react-icons/im"

import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { Button, ContainerButton, TextField } from "../../components"
import {
  deleteSelectedHistory,
  fetchWeather,
  selectCurrentWeather,
  selectWeatherHistory,
  selectWeatherStatus,
} from "./weatherSlice"
import { LocationType } from "./weather.type"
import dayjs from "dayjs"

const initLocation = { city: "", country: "" } as LocationType

const SearchBar = () => {
  const dispatch = useAppDispatch()
  const [location, setLocation] = useState(initLocation)

  return (
    <form
      className="mt-5 flex items-center justify-center xs:gap-2 gap-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        label={"City"}
        value={location.city}
        onChange={(e) =>
          setLocation((prev) => ({
            ...prev,
            city: e.target.value,
          }))
        }
      />
      <TextField
        label={"Country"}
        value={location.country}
        onChange={(e) =>
          setLocation((prev) => ({
            ...prev,
            country: e.target.value,
          }))
        }
      />
      <Button
        title={<FaSearch />}
        onChange={() => {
          dispatch(fetchWeather(location))
          setLocation(initLocation)
        }}
      />
      <Button title={<MdClear />} onChange={() => setLocation(initLocation)} />
    </form>
  )
}

const Listing = () => {
  const weatherStatus = useAppSelector(selectWeatherStatus)
  const currentWeather = useAppSelector(selectCurrentWeather)
  const searchHistory = useAppSelector(selectWeatherHistory)
  const dispatch = useAppDispatch()

  return (
    <div className="xs:mt-14 mt-28 xs:mx-5 mx-0 bg-white bg-opacity-20 dark:bg-[#1A1A1A] dark:bg-opacity-30 rounded-[40px] border border-white dark:border-transparent border-opacity-50 backdrop-blur-[20px]">
      {weatherStatus === "idle" ? (
        <div>
          <div className="mt-8 mx-8 grid grid-cols-2">
            <span className="">Today's Weather</span>
            <img
              alt="weather-icon"
              className=" row-span-3 xs:h-full h-[200%] relative -translate-y-48 xs:-translate-y-24"
              src={`https://openweathermap.org/img/wn/${currentWeather?.weather?.[0]?.icon}@2x.png`}
            />
            <span className="text-8xl font-bold text-[#6C3FB4] dark:text-white">
              {currentWeather?.main?.temp?.toFixed(0)}&#176;
            </span>
            <span>
              H:{currentWeather?.main?.temp_max?.toFixed(0)}&#176; L:
              {currentWeather?.main?.temp_min?.toFixed(0)}&#176;
            </span>
          </div>
          <div className="mx-8 flex justify-between xs:grid xs:grid-cols-2">
            <span className="text-[#666666] dark:text-white font-bold">
              {currentWeather?.name + ", " + currentWeather?.sys?.country}
            </span>
            <span className="text-[#666666] dark:text-white xs:flex xs:justify-end xs:text-xs xs:items-center">
              {dayjs(currentWeather?.created_at).format("DD-MM-YYYY HH:mma")}
            </span>
            <span className="text-[#666666] dark:text-white">
              Humidity: {currentWeather?.main?.humidity}%
            </span>
            <span className="text-[#666666] dark:text-white xs:flex xs:justify-end">
              {currentWeather?.weather?.[0]?.description}
            </span>
          </div>
        </div>
      ) : weatherStatus === "failed" ? (
        <div className="p-4 m-4 mx-8 flex justify-center items-center border border-red-500 bg-red-500 rounded-2xl">
          <div>Not found</div>
        </div>
      ) : (
        <div className="p-4 m-4 flex justify-center items-center">
          <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" />
        </div>
      )}
      <div className="mt-4 mx-[32px] p-4 bg-white bg-opacity-20 dark:bg-[#1A1A1A] dark:bg-opacity-30 rounded-3xl">
        Search History
        {searchHistory.length > 0 ? (
          searchHistory.map((history, index) => (
            <div
              className="mt-[16px] p-4 bg-white bg-opacity-40 dark:bg-[#1A1A1A] dark:bg-opacity-50 rounded-2xl"
              key={`history-${index}`}
            >
              <div className="grid grid-cols-8 items-center">
                <div className="col-span-7 xs:col-span-6 flex items-center justify-between xs:flex-col xs:items-start">
                  <span className="flex justify-start">
                    {history.name + ", " + history?.sys?.country}
                  </span>
                  <span className="xs:text-xs dark:text-white dark:text-opacity-50">
                    {dayjs(history.created_at).format("DD-MM-YYYY HH:mma")}
                  </span>
                </div>
                <div className="xs:col-span-2 flex justify-end items-center">
                  <ContainerButton
                    title={<FaSearch />}
                    onChange={() => {
                      dispatch(
                        fetchWeather({
                          city: searchHistory[index].name,
                          country: searchHistory[index].sys?.country,
                        }),
                      )
                    }}
                  />
                  <ContainerButton
                    title={<ImBin2 />}
                    onChange={() => dispatch(deleteSelectedHistory(index))}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-2 flex justify-center items-center text-stone-500 dark:text-white">
            <div>No Record</div>
          </div>
        )}
      </div>
    </div>
  )
}

export const Weather = () => {
  // Toggle between dark and light mode
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const getTheme = () => {
    if (
      sessionStorage.theme === "dark" ||
      (!("theme" in sessionStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkTheme(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkTheme(false)
      document.documentElement.classList.remove("dark")
    }
  }

  useEffect(() => {
    getTheme()
  }, [isDarkTheme])

  return (
    <div>
      <SearchBar />
      <div
        onClick={() => {
          sessionStorage.theme = isDarkTheme ? "light" : "dark"
          setIsDarkTheme(!isDarkTheme)
        }}
        className="text-2xl border-b-2 border-transparent dark:hover:text-gray-200 hover:border-custom-blue hover:cursor-pointer mx-1.5 sm:mx-6 mt-1"
      >
        {isDarkTheme ? <MdOutlineWbSunny /> : <MdOutlineDarkMode />}
      </div>
      <Listing />
    </div>
  )
}

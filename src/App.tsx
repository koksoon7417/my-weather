import { Weather } from "./features/weather/Weather"

function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center flex-col 
    bg-cover bg-[url('/bg-light.png')] dark:bg-[url('/bg-dark.png')] dark:text-white"
    >
      <Weather />
    </div>
  )
}

export default App

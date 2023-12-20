import defaultTheme from "tailwindcss/defaultTheme"

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      "2xs": { min: "300px" },
      xs: { max: "575px" }, // Mobile (iPhone 3 - iPhone XS Max).
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}

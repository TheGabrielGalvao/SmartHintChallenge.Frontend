/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

const theme = require("./defaultTheme");

export default withMT({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      ...theme,
    },
  },
  plugins: [],
})


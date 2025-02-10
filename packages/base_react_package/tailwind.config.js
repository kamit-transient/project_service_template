/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: 'roboto, ui-serif', // Adds a new `font-display` class
      },
      colors: {
        primary: colors.gray,
        secondary: colors.rose
      }
    },
  },
  plugins: [],
}
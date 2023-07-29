/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontSize: {
        'my-custom-size': '9px'
      }
    },
  },
  plugins: [],
}
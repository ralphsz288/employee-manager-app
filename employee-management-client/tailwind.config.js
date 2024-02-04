/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'aleo' : ['Aleo', 'serif'],
        'roboto' : ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}


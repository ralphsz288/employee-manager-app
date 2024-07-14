// @type {import('tailwindcss').Config}
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans' : ['Fira Sans Condensed', 'sans-serif'],
        'aleo' : ['Aleo', 'serif'],
        'roboto' : ['Roboto', 'sans-serif'],
        'lato' : ['Lato', 'sans-serif']
      },
    },
  },
  plugins: [],
}

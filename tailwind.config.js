module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      'icons-tiny': '20px'
    },
    colors: {
      'light': '#ffffff',
      'dark': '#171717'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

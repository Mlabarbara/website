/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "/styles/*.{css,js,html}",
    "/js/*.{js,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./front-end/src/**/*.{js,jsx,ts,tsx}",
    "./sidepanel.html"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
      },
    },
  },
  plugins: [],
}

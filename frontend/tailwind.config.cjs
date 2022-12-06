/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EE6640",
        "dark-200": "#111",
        "dark-100": "#222",
        "white" : "#eeeeee"
        
      },
      fontFamily: {
        head: ["Roboto", "serif"],
        body: ["Josefin Sans", "sans-serif"],
      },
    },
  },
  plugins: [require('daisyui')],
};

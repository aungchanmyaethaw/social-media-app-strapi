/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EE6640",
        "dark-200": "#222",
        "dark-100": "#444",
        "white" : "#EEEEEE"
      },
      fontFamily: {
        head: ["PT Serif", "serif"],
        body: ["Josefin Sans", "sans-serif"],
      },
    },
  },
  plugins: [require('daisyui')],
};

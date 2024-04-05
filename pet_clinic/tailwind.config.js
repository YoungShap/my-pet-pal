/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#92bcff",
      main:"#373d44",
      white: "white",
      orange: "#c06450",
      blue: "#606ab8",
      purple: "#7c7cff",
      specialPurple:"#adc9f6",
      softWhite: "#dbe7ff",
      grey:"#646464",
    },
    fontFamily: {
      mono: ["Roboto", "monospace"],
      sans: ["Roboto", "sans-serif"],
      serif: ["Roboto", "sans-serif"],
      display: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      boxShadow: {
        glow: "0 0 10px #0000004f", // Define your glow effect here
      },
      gridTemplateRows: {
        "auto-1fr": "auto 1fr",
      },
    },
  },
  plugins: [],
};

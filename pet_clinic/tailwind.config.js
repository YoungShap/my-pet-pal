/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#92bcff",
      white:'white',
      brown: '#8B4513',
      blue:'#92bcff',
      purple: "#7c7cff",
      softWhite:"#dbe7ff"
    },
    fontFamily: {
      mono: ["Roboto", "monospace"],
      sans: ["Roboto", "sans-serif"],
      serif: ["Roboto", "sans-serif"],
      display: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      gridTemplateRows: { 
        "auto-1fr": "auto 1fr",
      },
    },
  },
  plugins: [],
};

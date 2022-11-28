/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      "kimberley": ["Kimberley"],
      "bank": ["Bank"],
      "eurostile": ["Eurostile"],
      "eurostile-demi": ["Eurostile Demi"]
    },
    extend: {
      listStyleType: {
        "alpha": "lower-alpha",
        "circle": "circle"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
  ],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vodafone-red': '#e60000',
      },
      maxWidth: {
        '3xl': '48rem',
        '5xl': '64rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

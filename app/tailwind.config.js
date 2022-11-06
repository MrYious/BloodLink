/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-banner': "url('./assets/images/bgHeroBanner.jpg')",
        'contact': "url('./assets/images/bgContact.jpg')",
      }
    },
  },
  plugins: [],
}

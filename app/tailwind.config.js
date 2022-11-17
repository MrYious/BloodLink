/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-banner': "url('./assets/images/bgHeroBanner.jpg')",
        'contact': "url('./assets/images/bgContact.jpg')",
        'about1': "url('./assets/images/bgAbout1.jpg')",
        'about2': "url('./assets/images/bgAbout2.jpg')",
        'about3': "url('./assets/images/bgAbout3.jpg')",
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}

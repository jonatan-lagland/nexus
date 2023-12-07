/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
        'charcoal': '#191919',
        'dark-grey': '#212121',
        'navy-blue': '#1C0C5B',
        'cosmic-cobalt': '#3D2C8D',
        'viola': '#916BBF',
        'rose': '#C996CC'
      }
    },
  },
  plugins: [],
}
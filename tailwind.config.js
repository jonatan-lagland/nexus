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
        oswald: ['Oswald', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        abel: ['Abel', 'sans-serif'],
        figtree: ['Figtree', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
        'vibrant-orange': '#ff7420',
        'charcoal': '#191919',
        'dark-grey': '#212121',
        'navy-blue': '#281F74',
        'deep-purple': '#303554',
        'cosmic-cobalt': '#4B63A3',
        'cosmic-purple': '#101041',
        'dark-cosmic': '#0E265C',
        'viola': '#916BBF',
        'rose': '#C996CC',
        'dark-blue': '#123456',
        'light-blue': '#56789A',
        'cream': '#EFE7D3',
        'dust': '#A09D94',
        'dark-dust': "#93918A",
        'crimson-grey': '#A489A0',
        'grass': '#67a63c',
        'dark-wine': '#481817',
        'wine': '#5c1c25',
        'dark-crimson': '#400504',
        'forest': '#19391a',
        'swamp': '#253f25',
        'grapefruit': '#e5393c',
        'bright-green': '#48b200',
        'bright-red': '#f12122',
        'rune': "#6cc1f2",
        'colorblind-win-primary': "#1d254e",
        'colorblind-win-secondary': "#404873",
        'colorblind-win-tertiary': "#575f89",
        'colorblind-loss-primary': "#481817",
        'colorblind-loss-secondary': "#f7e592",
        'colorblind-loss-tertiary': "#7e6b40"
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        tilt: 'tilt 10s infinite linear',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(0.5deg)',
          },
          '75%': {
            transform: 'rotate(-0.5deg)',
          },
        },
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: "var(--inter)",
        oswald: "var(--oswald)",
        bebas: "var(--bebas)",
        abel: "var(--abel)",
        rubik: "var(--rubik)",
        slabo: "var(--slabo)",
        notosans: "var(--notosans)"
      },
      colors: {
        'primary-orange': '#FF5722',
        'vibrant-orange': '#ff7420',
        'charcoal': '#191919',
        'dark-grey': '#16171a',
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
        'dark-wine': '#48171a',
        'wine': '#642527',
        'grape': "#692a21",
        'dark-crimson': '#400504',
        'coffee': '#3f0e0a',
        'forest': '#19391a',
        'forest-light': '#2e5e2a',
        'swamp': '#253f25',
        'grapefruit': '#e5393c',
        'bright-green': '#48b200',
        'bright-red': '#f12122',
        'rune': "#6cc1f2",
        'colorblind-win-primary': "#1d254e",
        'colorblind-win-secondary': "#404873",
        'colorblind-win-tertiary': "#575f89",
        'colorblind-loss-primary': "#481817",
        'colorblind-loss-secondary': "#692a21",
        'colorblind-loss-tertiary': "#7e6b40",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
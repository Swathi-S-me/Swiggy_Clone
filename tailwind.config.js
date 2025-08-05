// tailwind.config.js
import {  Config } from 'tailwindcss'

const config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
     fontFamily: {
  sans: ['var(--font-sans)'], // allows dynamic CSS variable override
}
    },
  },
  plugins: [],
}

export default config

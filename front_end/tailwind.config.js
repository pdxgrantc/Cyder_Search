/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['stratum2', 'sans-serif'],
      },
      textColor: {
        DEFAULT: '#f7f5f5',
        offwhite: '#f7f5f5',
      },
      fontSize: {
        DEFAULT: '1rem',
      },
      backgroundColor: {
        DEFAULT: '#423e3c',
        orange: '#D73F09',
        black: '#000000',
        white: '#FFFFFF',
        darkbg: '#423e3c',
      },
      padding: {
        page: '5rem',
      },
      margin: {
        page: '3rem 5rem',
      },
      borderRadius: {
        default: '0.5rem',
      }
    },
  },
  plugins: [],
}
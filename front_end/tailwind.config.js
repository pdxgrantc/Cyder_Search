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
        DEFAULT: '#ebebeb',
        offwhite: '#f7f5f5',
      },
      fontSize: {
        DEFAULT: '1.25rem',
        mobile: '1.25rem',
        title: '5rem',
        xxlheader: '4.25rem',
        xlheader: '3.75rem',
        lheader: '3.25rem',
        header: '2.75rem',
        subheader: '2.5rem',
        xxl: '2rem',
        xl: '1.75rem',
        l: '1.5rem',
        m: '1.25rem',
        s: '1rem',
      },
      backgroundColor: {
        DEFAULT: '#423e3c',
        orange: '#D73F09',
        black: '#000000',
        white: '#FFFFFF',
        darkbg: '#423e3c',
        offwhite: '#f7f5f5',
      },
      padding: {
        page: '5rem',
      },
      margin: {
        page: '2rem 5rem',
        x_page: '0rem 5rem',
      },
      borderRadius: {
        default: '0.5rem',
      }
    },
  },
  plugins: [],
}
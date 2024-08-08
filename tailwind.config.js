/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bg:{
          DEFAULT:'#F2F2F2',
          dark: '#BBBBBB'
        },
        text:{
          DEFAULT:"#2F2F2F",
          light:"#ACACAC"
        },
        border:{
          DEFAULT:"#E1E1E1"
        }
      }
    },
  },
  plugins: [],
}


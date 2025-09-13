/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#EBEFFF',
          200: '#E0E1FF',
          300: '#CEC9FF',
          400: '#A492FF',
          500: '#796AFF',
          600: '#7850FB',
          700: '#6339EC',
          800: '#5531CB',
          900: '#2F0D9F',
        },
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          100: '#F2F3F8',
          200: '#E5E8EF',
          300: '#CBD1DC',
          400: '#99A1B1',
          500: '#707885',
          600: '#4E5560',
          700: '#3C4149',
          800: '#272B31',
          900: '#1D1E20',
        },
        green: {
          100: '#113721',
          600: '#02AF6A',
        },
        red: {
          100: '#4D2321',
          600: '#F13A49',
        },
        blue: {
          100: '#163A50',
          600: '#23ABFF',
        },
        yellow: {
          100: '#4D2321',
          600: '#F4B005',
        },
      },
    },
  },
  plugins: [],
};

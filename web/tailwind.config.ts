/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        h1: ['1.75rem', { lineHeight: '130%', fontWeight: '600' }],
        h2: ['1.5rem', { lineHeight: '135%', fontWeight: '600' }],
        h3: ['1.25rem', { lineHeight: '135%', fontWeight: '600' }],
        h4: ['1rem', { lineHeight: '150%', fontWeight: '600' }],
        'body1-r': ['1.125rem', { lineHeight: '135%', fontWeight: '400' }],
        'body1-m': ['1.125rem', { lineHeight: '130%', fontWeight: '500' }],
        'body1-sb': ['1.125rem', { lineHeight: '130%', fontWeight: '600' }],

        'body2-r': ['1rem', { lineHeight: '150%', fontWeight: '400' }],
        'body2-m': ['1rem', { lineHeight: '150%', fontWeight: '500' }],
        'body2-sb': ['1rem', { lineHeight: '150%', fontWeight: '600' }],

        'body3-r': ['0.875rem', { lineHeight: '145%', fontWeight: '400' }],
        'body3-m': ['0.875rem', { lineHeight: '145%', fontWeight: '500' }],
        'body3-sb': ['0.875rem', { lineHeight: '145%', fontWeight: '600' }],

        'body4-r': ['0.75rem', { lineHeight: '150%', fontWeight: '400' }],
        'body4-m': ['0.75rem', { lineHeight: '150%', fontWeight: '500' }],
        'body4-sb': ['0.75rem', { lineHeight: '150%', fontWeight: '600' }],

        'button-1': ['1.125rem', { lineHeight: '110%', fontWeight: '500' }],
        'button-2': ['1rem', { lineHeight: '115%', fontWeight: '500' }],
        'button-3': ['0.875rem', { lineHeight: '115%', fontWeight: '600' }],
        'button-4': ['0.75rem', { lineHeight: '135%', fontWeight: '600' }],
        'button-5': ['0.6875rem', { lineHeight: '110%', fontWeight: '600' }],
      },
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

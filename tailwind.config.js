/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        cosmos: "url('./src/assets/background.jpg')"
      },
      width: {
        customLen1: 'calc(35vw-1.5rem)/2'
      }
    },
    colors: {
      // mainColor: 'rgba(24, 18, 43, 1)',
      mainColor: 'rgba(31, 33, 38, 1)',
      bgComp: 'rgba(49, 53, 60, 1)',
      bgLayout: 'rgba(46, 49, 54, 1)',
      mainColor5: 'rgba(24, 18, 43, 0.5)',
      mainColorM: 'rgba(46,35,108,100)',
      mainColorH: 'rgb(57, 48, 83)',

      mainLightColor: '#635985',
      dashColor: '#C8ACD6',
      white: '#ffffff',
      black: '#000000',
      colorOn: '#00FF04',
      colorOff: '#ff0000',
      colorNone: '#8E8E8E',

      textGray01: 'rgba(112, 112, 112, 1)',
      borderGray: 'rgba(219, 219, 219, 1)',

      borderMaterial: 'rgba(26, 84, 114, 1)',
      borderMaterial2: 'rgba(26, 84, 54, 1)'
    }
  },
  plugins: [require('daisyui'), require('@iconify/tailwind')]
};

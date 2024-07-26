/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        cosmos: "url('./src/assets/background.jpg')"
      }
    },
    colors: {
      mainColor: 'rgba(24, 18, 43, 1)',
      mainColorM: 'rgba(46,35,108,100)',
      mainColorH: 'rgb(57, 48, 83)',
      mainLightColor: '#635985',
      dashColor: '#C8ACD6',
      white: '#ffffff',
      black: '#000000'
    }
  },
  plugins: [require('daisyui'), require('@iconify/tailwind')]
};

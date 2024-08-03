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
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-down': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.7s ease-out',
        'slide-down': 'slide-down 0.6s ease-out forwards',
      },
      colors: {
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
      },
      scrollbar: {
        'rounded': true,
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('@iconify/tailwind'),
    require('tailwind-scrollbar'),
  ],
};

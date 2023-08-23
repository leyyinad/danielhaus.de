import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    // colors: {
    //   haiti: {
    //     '50': '#edf3ff',
    //     '100': '#dfe8ff',
    //     '200': '#c5d5ff',
    //     '300': '#a2b8ff',
    //     '400': '#7d91fc',
    //     '500': '#5f6bf5',
    //     '600': '#4142ea',
    //     '700': '#3533cf',
    //     '800': '#2c2ca7',
    //     '900': '#2b2d84',
    //     '950': '#111133',
    //   }
    // },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

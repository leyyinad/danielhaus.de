import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat var', 'Inter var', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      daniel: {
        '50': '#f1f3ff',
        '100': '#e6eaff',
        '200': '#d0d8ff',
        '300': '#abb6ff',
        '400': '#7b87ff',
        '500': '#464dff',
        '600': '#2420ff',
        '700': '#150ff2',
        '800': '#110ccb',
        '900': '#100ca6',
        '950': '#040577',
      }
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

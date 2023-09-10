import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat var', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      bluebirth: {
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
      },
      goldensky: {
        '50': '#feffe7',
        '100': '#fbffc1',
        '200': '#fcff86',
        '300': '#fffc41',
        '400': '#fff00d',
        '500': '#f2d600',
        '600': '#d1a700',
        '700': '#a67802',
        '800': '#895d0a',
        '900': '#744c0f',
        '950': '#442804',
      },
      // 'violetshirt': {
      //   '50': '#fff1f3',
      //   '100': '#ffe3e7',
      //   '200': '#ffc0cb',
      //   '300': '#ffa2b3',
      //   '400': '#fe6e8b',
      //   '500': '#f83b66',
      //   '600': '#e51951',
      //   '700': '#c20e43',
      //   '800': '#a20f40',
      //   '900': '#8a113c',
      //   '950': '#4d041c',
      // },
      'violetshirt': {
        '50': '#fcf7fc',
        '100': '#f8eef9',
        '200': '#f1dbf3',
        '300': '#e7bfe8',
        '400': '#dda0dd',
        '500': '#c66fc5',
        '600': '#a950a7',
        '700': '#8c3f89',
        '800': '#733570',
        '900': '#5f305c',
        '950': '#3c1639',
      },
      white: '#ffffff',
      black: '#000000'
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

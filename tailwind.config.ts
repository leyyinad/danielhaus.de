import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat var', ...defaultTheme.fontFamily.sans]
    },
    colors: {
      bluebirth: {
        50: '#f1f3ff',
        100: '#e6eaff',
        200: '#d0d8ff',
        300: '#abb6ff',
        400: '#7b87ff',
        500: '#464dff',
        600: '#2420ff',
        700: '#150ff2',
        800: '#110ccb',
        900: '#100ca6',
        950: '#040577'
      },
      goldensky: {
        50: '#feffe7',
        100: '#fbffc1',
        200: '#fcff86',
        300: '#fffc41',
        400: '#fff00d',
        500: '#f2d600',
        600: '#d1a700',
        700: '#a67802',
        800: '#895d0a',
        900: '#744c0f',
        950: '#442804'
      },
      violetshirt: {
        50: '#fcf7fc',
        100: '#f8eef9',
        200: '#f1dbf3',
        300: '#e7bfe8',
        400: '#dda0dd',
        500: '#c66fc5',
        600: '#a950a7',
        700: '#8c3f89',
        800: '#733570',
        900: '#5f305c',
        950: '#3c1639'
      },
      fungreen: {
        50: '#edfff3',
        100: '#d5ffe4',
        200: '#adffca',
        300: '#6effa1',
        400: '#28ff71',
        500: '#00ea4e',
        600: '#00c33d',
        700: '#009833',
        800: '#04782d',
        900: '#066128',
        950: '#003713'
      },
      kashmirgrey: {
        50: '#f6f7f9',
        100: '#eceef2',
        200: '#d5dae2',
        300: '#b0bac9',
        400: '#8594ab',
        500: '#607088',
        600: '#516078',
        700: '#434d61',
        800: '#3a4352',
        900: '#333a47',
        950: '#22262f'
      },

      white: '#ffffff',
      black: '#000000'
    },
    extend: {
      transitionDuration: {
        3000: '3000ms'
      },
      transitionDelay: {
        5000: '5000ms'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
} as Config;

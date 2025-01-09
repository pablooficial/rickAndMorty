/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'primary-title': '#00B5CC',
        'secondary-title': '#B2DF28',
        'core-foreground': '#0A0A0A',
        'core-background': '#1F1F1F',
        'core-content': '#FAFAFA',
        'core-content-low': '#A4A4A4',
        'neutral-content': '#A4A4A4',
        'neutral-surface': '#FFFFFF',
        'neutral-content-onSource': '#0A0A0A',
        'core-border': '#3D3D3D'
      },
      fontFamily: {
        creepster: ['Creepster', 'serif'],
      },

    },
  },
  plugins: [],
}


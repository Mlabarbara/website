/** @type {import('tailwindcss').Config} */
export const content = [
  "./*.html",
  "./styles/*.{css,js,html}",
  "./js/*.{js,html}",
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
};
export const plugins = [];
export const darkMode = 'class';


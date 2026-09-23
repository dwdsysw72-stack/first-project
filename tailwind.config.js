/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:     '#0C0A09',
        surface: '#15110F',
        card:    '#1E1815',
        stone:   '#2A2320',
        hair:    '#3B332D',
        ivory:   '#F5F1EA',
        muted:   '#B8AEA1',
        gold: {
          DEFAULT: '#A16207',
          light:   '#D9B25B',
          bright:  '#EFCE81',
          dark:    '#6E4405',
        },
      },
      fontFamily: {
        serif: ['"Frank Ruhl Libre"', 'Georgia', 'serif'],
        sans:  ['Assistant', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 8px 30px -8px rgba(161,98,7,0.45)',
      },
    },
  },
  plugins: [],
};

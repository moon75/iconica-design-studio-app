/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', '-apple-system', 'Roboto', '"Helvetica Neue"', '"Noto Sans"', '"Liberation Sans"', 'Arial', 'sans-serif'],
        serif: ['Jost', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      colors: {
        porcelain: '#f5f2eb',
        ink: '#171717',
        clay: '#b96b4d',
        olive: '#72745f',
        bone: '#e7dfd2',
      },
    },
  },
  plugins: [],
}

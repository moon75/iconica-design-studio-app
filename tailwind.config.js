/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Segoe UI', 'Arial', 'sans-serif'],
        serif: ['Jost', 'Segoe UI', 'sans-serif'],
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

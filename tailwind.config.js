/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      container: { center: true, padding: '1rem' },
      colors: { brand: { DEFAULT: '#6d28d9', 600:'#7c3aed', 700:'#6d28d9' } }
    },
  },
  plugins: [],
}

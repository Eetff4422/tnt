/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Bleu industriel - couleur de marque principale
        primary: {
          50: '#eef4fb',
          100: '#d9e7f5',
          200: '#b3cfeb',
          300: '#82b0dc',
          400: '#4f8dc9',
          500: '#2f6fae',
          600: '#1f5590',
          700: '#1a4474',
          800: '#173a61',
          900: '#142f4f',
          950: '#0c1c30',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        phone: '0 25px 50px -12px rgba(12, 28, 48, 0.45)',
      },
    },
  },
  plugins: [],
}

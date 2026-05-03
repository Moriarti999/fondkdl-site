/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: { 
          50: '#fff7ed', 
          100: '#ffedd5', 
          200: '#fed7aa', 
          300: '#fdba74', 
          400: '#fb923c', 
          500: '#f97316', 
          600: '#ea580c', 
          700: '#c2410c', 
          800: '#9a3412', 
          900: '#7c2d12' 
        },
        accent: { 500: '#f59e0b', 600: '#d97706' },
        surface: { DEFAULT: '#ffffff', 50: '#fafafa', 100: '#f5f5f5', dark: '#0f172a', dark50: '#1e293b' },
        text: { primary: '#0f172a', secondary: '#475569', muted: '#94a3b8', dark: '#f8fafc', darkSec: '#cbd5e1' }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(234, 88, 12, 0.08)',
        'soft-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        'soft-hover': '0 10px 30px -4px rgba(234, 88, 12, 0.12)',
      }
    },
  },
  plugins: [],
}
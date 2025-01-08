/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // Enable dark mode via class
  theme: {
      extend: {
          colors: {
             'dark-bg': '#111827',
             'dark-text': '#f3f4f6',
            'light-bg': '#f7fafc',
             'light-text': '#2d3748',
              'primary-light':'#4A5568',
              'primary-dark':'#CBD5E0'
          },
      },
  },
  plugins: [],
};
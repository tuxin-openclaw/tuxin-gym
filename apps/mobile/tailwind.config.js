/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eaf1ff',
          100: '#d9e6ff',
          500: '#4c8dff',
          600: '#3e7aec',
          700: '#2f63cc',
        },
        page: {
          bg: '#f4f6fb',
        },
        card: {
          DEFAULT: '#ffffff',
          soft: '#f8faff',
        },
        ink: {
          1: '#1c2437',
          2: '#5f6b84',
          3: '#9ba4b7',
        },
      },
      boxShadow: {
        card: '0 10px 24px rgba(18, 38, 63, 0.06)',
        soft: '0 6px 16px rgba(16, 35, 65, 0.05)',
      },
      borderRadius: {
        card: '28px',
        panel: '22px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

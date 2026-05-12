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
          50: '#ecfdf3',
          100: '#d9fbe8',
          200: '#b6f4d1',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        teal: {
          50: '#effdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
        },
        accent: {
          blue: '#3b82f6',
          orange: '#f59e0b',
        },
        page: {
          bg: '#f7f8fa',
          mint: '#eefaf4',
        },
        card: {
          DEFAULT: '#ffffff',
          soft: '#f8fffb',
        },
        ink: {
          1: '#111827',
          2: '#6b7280',
          3: '#9ca3af',
        },
        line: '#e5e7eb',
      },
      boxShadow: {
        card: '0 16px 36px rgba(17, 24, 39, 0.07)',
        soft: '0 8px 20px rgba(17, 24, 39, 0.05)',
        tab: '0 -10px 26px rgba(17, 24, 39, 0.07)',
      },
      borderRadius: {
        card: '32px',
        panel: '24px',
        pill: '999px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

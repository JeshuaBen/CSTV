/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#161621',
        primaryWhite: '#FFFFFF',
        foreground: '#FFFFFF',
        muted: '#C4C4C4',
        red: '#F42A35',
        gray700: '#FAFAFA33',
        gray600: '#6C6B7E',
        gray500: '#C4C4C4',
        cardSurface: '#272639',
      },
      spacing: {
        18: '4.5rem',
      },
      borderRadius: {
        xl: '0.875rem',
      },
      fontSize: {
        title: ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        body: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        caption: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};

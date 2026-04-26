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
        none: '0px',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.875rem',
        full: '9999px',
      },
      fontFamily: {
        'roboto-400': ['Roboto_400Regular'],
        'roboto-500': ['Roboto_500Medium'],
        'roboto-600': ['Roboto_600SemiBold'],
        'roboto-700': ['Roboto_700Bold'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        md: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        title: ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        body: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        caption: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};

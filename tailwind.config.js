/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        furniture: {
          brown: '#8B4513',
          'light-brown': '#D2691E',
          cream: '#F5F5DC',
          'dark-wood': '#654321',
        },
        elegant: {
          charcoal: '#2D3748',
          brown: '#8B4513',
          cream: '#F7FAFC',
          'cream-light': '#EDF2F7',
          beige: '#F7FAFC',
        }
      },
      cursor: {
        'fancy': 'url(hand.cur), pointer',
        'click': 'pointer',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in-delay': {
          '0%, 50%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'fade-in-delay': 'fade-in-delay 1.2s ease-out forwards',
      }
    },
  },
  plugins: [],
}
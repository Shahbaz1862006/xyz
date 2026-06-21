import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B83FF',
        'primary-light': '#4DA3FF',
        'tron-red': '#EF146E',
        'usdt-green': '#26A17B',
        'bg-dark': '#04070F',
        'bg-light': '#D9E8F3',
      },
      fontFamily: {
        grifter: ['var(--font-grifter)', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
      },
      backdropBlur: {
        glass: '32px',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.4)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
        'primary-glow': '0 0 40px rgba(11,131,255,0.4)',
        'coin-tron': '0 20px 60px -10px rgba(239,20,110,0.4)',
        'coin-usdt': '0 20px 60px -10px rgba(38,161,123,0.4)',
      },
    },
  },
  plugins: [],
}

export default config

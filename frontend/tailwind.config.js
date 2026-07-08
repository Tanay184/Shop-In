/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fff8e7',
          100: '#ffedb8',
          200: '#ffe08a',
          300: '#ffd45c',
          400: '#ffc62e',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        shopin: {
          orange: '#f59e0b',
          dark:   '#0f172a',
          light:  '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':      'fadeIn 0.3s ease-in-out',
        'slide-up':     'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'bounce-in':    'bounceIn 0.5s ease-out',
        'pulse-slow':   'pulse 3s infinite',
        'shimmer':      'shimmer 2s infinite',
        'spin-slow':    'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceIn: {
          '0%':   { transform: 'scale(0.8)', opacity: '0' },
          '60%':  { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'card':    '0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)',
        'btn':     '0 4px 14px rgba(245,158,11,0.4)',
        'btn-hover': '0 6px 20px rgba(245,158,11,0.5)',
      },
      backgroundImage: {
        'gradient-shopin': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        'gradient-dark':   'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      },
    },
  },
  plugins: [],
}

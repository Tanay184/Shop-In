/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced color palette with proper neutral grays
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
        neutral: {
          50:  '#fafafa',
          100: '#f5f5f5',
          150: '#eeeeee',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
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
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      animation: {
        'fade-in':      'fadeIn 0.2s ease-in-out',
        'slide-up':     'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.25s ease-out',
        'bounce-in':    'bounceIn 0.4s ease-out',
        'pulse-slow':   'pulse 3s infinite',
        'shimmer':      'shimmer 2s infinite',
        'spin-slow':    'spin 3s linear infinite',
        'scale-in':     'scaleIn 0.2s ease-out',
        'wiggle':       'wiggle 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceIn: {
          '0%':   { transform: 'scale(0.9)', opacity: '0' },
          '50%':  { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleIn: {
          '0%':   { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        // Enhanced shadow system
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 8px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 28px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)',
        'card-lift': '0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)',
        'btn': '0 4px 12px rgba(245,158,11,0.35)',
        'btn-hover': '0 6px 20px rgba(245,158,11,0.45)',
        'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-shopin': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, #f5f5f5 25%, #eeeeee 50%, #f5f5f5 75%)',
      },
      borderRadius: {
        'sm': '0.375rem',   // 6px
        'DEFAULT': '0.5rem', // 8px
        'md': '0.625rem',    // 10px
        'lg': '0.75rem',     // 12px
        'xl': '1rem',        // 16px
        '2xl': '1.25rem',    // 20px
        '3xl': '1.5rem',     // 24px
      },
    },
  },
  plugins: [forms],
}

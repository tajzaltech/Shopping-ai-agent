/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B1F3F',
          800: '#1A2F4F',
          700: '#2D4A6E',
          600: '#3E5E87',
          500: '#5478A0',
          400: '#7191B8',
          300: '#9AB4D1',
          200: '#C3D6EA',
          100: '#E1E9F4',
          50: '#F0F4F9',
        },
        grey: {
          900: '#1F2937',
          800: '#374151',
          700: '#4B5563',
          600: '#6B7280',
          500: '#9CA3AF',
          400: '#D1D5DB',
          300: '#E5E7EB',
          200: '#F3F4F6',
          100: '#F9FAFB',
        },
        primary: {
          DEFAULT: '#1A2F4F', // navy-800
          hover: '#0B1F3F',   // navy-900
          light: '#2D4A6E',   // navy-700
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        instrument: ['"Instrument Serif"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 32px 64px -16px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 48px 80px -20px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}

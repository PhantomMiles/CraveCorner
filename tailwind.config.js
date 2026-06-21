/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Crave Corner Palette
        'pastel-blue': '#B8D8E8',
        'pastel-blue-dark': '#8CBDD4',
        'rose-gold': '#C9876F',
        'rose-gold-light': '#E8AFA0',
        'peach': '#F5C5A3',
        'champagne': '#D4AF7A',
        'champagne-light': '#EDD9A3',
        'cream': '#FDF8F5',
        'cream-dark': '#F5EDE6',
        'mocha': '#3D2314',
        'mocha-light': '#5C3A25',
        'mocha-mid': '#7A4F38',
        'chocolate': '#7B3F00',
        'chocolate-light': '#D4906F',
        'chocolate-dark': '#352620',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'Georgia', 'serif'],
        'cormorant': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'champagne-gradient': 'linear-gradient(135deg, #D4AF7A 0%, #EDD9A3 50%, #C9876F 100%)',
        'rose-gradient': 'linear-gradient(135deg, #E8AFA0 0%, #C9876F 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FDF8F5 0%, #F5EDE6 100%)',
        'hero-gradient': 'linear-gradient(135deg, rgba(61,35,20,0.7) 0%, rgba(201,135,111,0.4) 100%)',
        'pastel-gradient': 'linear-gradient(135deg, #B8D8E8 0%, #F5C5A3 100%)',
      },
      boxShadow: {
        'neomorphism': '8px 8px 20px rgba(61,35,20,0.15), -4px -4px 12px rgba(255,255,255,0.8)',
        'neomorphism-hover': '12px 12px 28px rgba(61,35,20,0.2), -6px -6px 16px rgba(255,255,255,0.9)',
        'neomorphism-inset': 'inset 4px 4px 10px rgba(61,35,20,0.12), inset -4px -4px 8px rgba(255,255,255,0.7)',
        'glass': '0 8px 32px rgba(61,35,20,0.15)',
        'card': '0 4px 20px rgba(61,35,20,0.12)',
        'card-hover': '0 12px 40px rgba(61,35,20,0.2)',
        'champagne': '0 4px 20px rgba(212,175,122,0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Buildo brand: midnight ocean + cyan tide
        ocean: {
          50: '#E6F1F8',
          100: '#CCE3F1',
          500: '#0A1628', // primary
          600: '#0A1628',
          700: '#060D17',
        },
        tide: {
          400: '#22D3EE',
          500: '#06B6D4', // accent
          600: '#0891B2',
        },
        cream: '#FDFCF8',
        amber: '#F59E0B',
        coral: '#F43F5E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scroll': 'scroll var(--scroll-duration, 36s) linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

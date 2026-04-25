/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        faire: {
          black: '#0a0a0a',
          charcoal: '#1a1a1a',
          smoke: '#2c2c2c',
          ash: '#444444',
          mist: '#888888',
          silver: '#c0c0c0',
          pearl: '#e8e8e8',
          crimson: '#8b0000',
          scarlet: '#cc2200',
          gold: '#c9a84c',
          amber: '#e8b84b',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'smoke-drift': 'smokeDrift 8s ease-in-out infinite',
        'flicker': 'flicker 3s ease-in-out infinite',
        'curtain-rise': 'curtainRise 1.2s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'spotlight-sweep': 'spotlightSweep 6s ease-in-out infinite',
      },
      keyframes: {
        smokeDrift: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translateY(-12px) scale(1.05)', opacity: '0.8' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
          '75%': { opacity: '0.95' },
        },
        curtainRise: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        spotlightSweep: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      backgroundImage: {
        'smoke-texture': "url('/smoke-bg.png')",
        'curtain-gradient': 'linear-gradient(180deg, #1a0a0a 0%, #0a0a0a 100%)',
      }
    },
  },
  plugins: [],
}

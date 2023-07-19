module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      granjon: ['Granjon', 'system-ui'],
    },
    extend: {
      keyframes: {
        'progress-bar': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        arise: {
          '0%': { transform: 'translate(0px, 2rem)', opacity: '0' },
          '100%': { transform: 'translate(0px, 0px)', opacity: '100' },
        },
        'hero-img': {
          '0%': { transform: 'scale(1.2)', opacity: '80%' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'progress-bar': 'progress-bar 4s ease-in-out',
        arise: 'arise 1s ease-in-out',
        'hero-img': 'hero-img 1s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};

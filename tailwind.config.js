module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      granjon: ['Granjon', 'system-ui'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};

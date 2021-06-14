module.exports = {
  purge: ['./src/**/*.{js,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      height: ['hover'],
      width: ['hover'],
    },
  },
  plugins: [],
};

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      minHeight: {
        '85': '85vh',
        '80': '80vh',        
        '70': '70vh',
        '65': '65vh',
       },
      maxHeight: {
        '85': '85vh',
        '80': '80vh',
        '70': '70vh',
        '65': '65vh',

       },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

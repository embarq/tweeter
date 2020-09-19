module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        'lg': '12px',
        'xl': '16px'
      },
      shadow: {
        'sm': '0px 2px 4px rgba(0, 0, 0, 0.05)'
      }
    },
  },
  variants: {},
  plugins: [],
}

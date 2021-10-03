module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        blue: {
          darkest: '#0A2558',
          DEFAULT: '#F5F7FA',
          light: '#3A72E4'
        },
        purple: {
          light: '#8645FF',
          DEFAULT: '#8645FF',
          dark: '#181059',
          darkest: '#0E0A33'
        },
        white: '#FFFFFF',
        gray: {
          DEFAULT: '#B2AEDD',
          blueish: '#0A2558',
          background: '#F6F8FA'
        },
        yellow: {
          DEFAULT: '#ECBB01'
        },
        traffic_light: {
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: ''
        }
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked']
    }
  },
  plugins: [require('@tailwindcss/forms')]
}

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        blue: {
          darkest: "#0A2558",
          DEFAULT: "#F5F7FA",
          light: "#3A72E4"
        },
        purple: {
          light: "#8645FF",
          DEFAULT: "#8645FF",
          dark: "#181059",
          darkest: "#0E0A33",
        },
        white: "#FFFFFF",
        gray: {
          DEFAULT: "#B2AEDD",
          blueish: "#0A2558",
        },
        yellow: "#ECBB01",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      cursive: ["Style Script", "cursive"],
    },
    colors: {
      white: "#fff",
      black: "#000",
      gold: "#9e865e",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

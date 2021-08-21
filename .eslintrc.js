module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "prettier",
    "prettier/vue",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  // the code - add the 'vue/no-unused-components' rule
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-unused-components": "off",
  },
};

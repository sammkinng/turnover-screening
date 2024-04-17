module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        white: { A700: "#ffffff" },
        gray: { 100: "#f4f4f4", 400: "#c1c1c1", 500: "#ababab", 600: "#838383" },
        black: { 900: "#000000" },
        blue_gray: { 100: "#cccccc", 900: "#333333" },
        red: { "500_19": "#ff444419" },
      },
      boxShadow: {},
      fontFamily: { inter: "Inter" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        BLACK: "#000",
        PRIMARY: "#8B42FC",
        WHITE: "#fff",
        GRAY: "#B6B4B4",
        BLUE: "#4F75FE",
        GREEN: "#13C38B",
        PURPLE: "#9F3CFE",
        RED: "#FF555D",
        ORANGE: "#FF7D4F",
        COLOR_LIST: ["#4F75FE", "#13C38B", "#9F3CFE", "#FF555D", "#FF7D4F"],
      },
    },
  },
  plugins: [],
};

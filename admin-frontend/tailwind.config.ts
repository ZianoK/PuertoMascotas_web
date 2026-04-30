import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#08b2cb",
          light: "#5fd4e8",
          dark: "#068a9e",
          50: "#edfcfe",
          100: "#d2f6fb",
          200: "#abeef7",
          300: "#72e1f0",
          400: "#32cce1",
          500: "#08b2cb",
          600: "#0990a8",
          700: "#0e7489",
          800: "#145e70",
          900: "#154e5f",
        },
        brandDark: "#7440ac",
        brandDarkest: "#621d7c",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
        accent: {
          DEFAULT: "#c62179",
          light: "#e06aab",
          dark: "#a01862",
        },
        purple: {
          DEFAULT: "#7440ac",
          light: "#9b6fd0",
          dark: "#621d7c",
        },
        cloud: {
          50: "#f7f9f2",
          100: "#eff2ea",
          200: "#e0e4d8",
          300: "#c8ccbf",
          400: "#94a3b8",
          500: "#64748b",
        },
        brandDark: "#7440ac",
        brandDarkest: "#621d7c",
        background: "#f7f9f2",
        cardBg: "#ffffff",
        textDark: "#1a1035",
        textSecondary: "#64748b",
        border: "#e0e4d8",
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        shimmer: "shimmer 2s infinite linear",
        zoomIn: "zoomIn 20s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        blob: "blob 7s infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        zoomIn: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        "glass-lg": "0 12px 48px 0 rgba(31, 38, 135, 0.12)",
        "card-hover": "0 20px 60px -12px rgba(0, 0, 0, 0.15)",
        float: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;

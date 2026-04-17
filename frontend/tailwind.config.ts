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
          DEFAULT: "#204670",
          light: "#4c729c",
          dark: "#102e4d",
        },
        accent: "#3a7fcc",
        brandDark: "#204670",
        brandDarkest: "#102e4d",
        background: "#ffffff",
        cardBg: "#ffffff",
        textDark: "#102e4d",
        textSecondary: "#4c729c",
        border: "#e2e8f0",
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out',
        shimmer: 'shimmer 2s infinite linear',
        zoomIn: 'zoomIn 20s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        zoomIn: {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        warm: {
          50: "#FDFCFA",
          100: "#F8F7F3",
          200: "#F0EEE9",
          300: "#E5E1D8",
          DEFAULT: "#F8F7F3",
        },
        charcoal: {
          50: "#2D2D2D",
          100: "#242424",
          200: "#1E1E1E",
          300: "#171717",
          400: "#111111",
          DEFAULT: "#171717",
        },
        navy: {
          50: "#E8EDF4",
          100: "#C5D0E3",
          200: "#9AADD2",
          300: "#4A6FA5",
          400: "#2A4A7A",
          500: "#1E3155",
          600: "#152540",
          700: "#102A43",
          800: "#0B192F",
          900: "#060d1a",
          DEFAULT: "#102A43",
        },
        gold: {
          200: "#F0E4C8",
          300: "#E5D4B0",
          400: "#D8C8B0",
          500: "#C9A45C",
          600: "#A8853F",
          700: "#87682F",
          DEFAULT: "#C9A45C",
        },
        teal: {
          300: "#5CC4C4",
          400: "#2DD4BF",
          500: "#14A6A6",
          600: "#0D8F8F",
          700: "#0A7777",
          DEFAULT: "#14A6A6",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(1deg)" },
          "66%": { transform: "translateY(8px) rotate(-1deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201, 164, 92, 0.15)" },
          "50%": { boxShadow: "0 0 50px rgba(201, 164, 92, 0.35)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeInScale: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(201, 164, 92, 0.2)" },
          "50%": { borderColor: "rgba(201, 164, 92, 0.6)" },
        },
        scrollBounce: {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(8px)", opacity: "0.4" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.7s ease-out forwards",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        slideInRight: "slideInRight 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        floatSlow: "floatSlow 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite",
        fadeInScale: "fadeInScale 0.7s ease-out forwards",
        slideInLeft: "slideInLeft 0.7s ease-out forwards",
        borderGlow: "borderGlow 3s ease-in-out infinite",
        scrollBounce: "scrollBounce 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

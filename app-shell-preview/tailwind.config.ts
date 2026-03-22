import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        border: "rgba(31, 41, 55, 0.3)", // #1f2937/30
        input: "rgba(31, 41, 55, 0.3)",
        ring: "#7c3aed",
        background: "#05070a", // Deep void dark
        foreground: "#f8fafc",
        card: {
          DEFAULT: "rgba(10, 10, 18, 0.6)", // Slight transparency for glass effect
          foreground: "#f8fafc",
        },
        primary: {
          DEFAULT: "#7c3aed", // Electric purple
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1e1e2d",
          foreground: "#f8fafc",
        },
        accent: {
          DEFAULT: "#7c3aed",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        lg: "24px",
        md: "20px",
        sm: "16px",
        "3xl": "32px",
      },
      boxShadow: {
        "card-inner": "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
        "hover-glow": "0 0 20px -5px rgba(124, 58, 237, 0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        ivory: "#F5EBDD",
        parchment: "#EFE1CE",
        "champagne": "#D8C1A0",
        "antique-gold": "#B58B50",
        vermilion: "#A92D32",
        maroon: "#702B32",
        "muted-rose": "#B77D78",
        walnut: "#493126",
        espresso: "#38251E",
        "warm-white": "#FFFBF5",
        "muted-olive": "#777A5A",
      },
      borderColor: {
        gold: "#B58B50",
        parchment: "#EFE1CE",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#38251E",
            a: {
              color: "#702B32",
              fontWeight: 600,
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              textDecorationColor: "#B58B50",
            },
          },
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Lora", "Georgia", "serif"],
        handwritten: ["Allura", "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 0.7s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-down": "fadeInDown 0.7s ease-out forwards",
        "float-gentle": "floatGentle 6s ease-in-out infinite",
        "page-enter": "pageEnter 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pageEnter: {
          "0%": { opacity: "0", transform: "translateX(12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

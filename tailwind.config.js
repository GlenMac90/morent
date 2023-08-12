/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      plusJakartaSans: ["var(--plus-jakarta-sans)"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        blue50: "#C3D4E9",
        blue100: "#94A7CB",
        blue300: "#5CAFFC",
        blue500: "#3563E9",
        gray400: "#90A3BF",
        gray700: "#3D5278",
        gray800: "#424B5C",
        gray850: "#293346",
        gray900: "#1A202C",
        red400: "##ED3F3F",
        yellow400: "#FBAD39",
        white0: "#FFFFFF",
        white200: "#F6F7F9",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

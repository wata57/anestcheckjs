/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include React/JSX/TSX files
  ],
  theme: {
    extend: {
      colors: {
        "pure-white": "#ffffff",
        "white-2": "#F5F5F5",
        title: "#fde68a",
        "primary-light": "#3b82f6",
        "primary-light2": "#1E9AA8",
        "primary-dark": "#1E9AA8",
        "dark-text": "#21ABBA",
        "quart-1": "#ADED6B",
        "quint-1": "#477F10",
        "homeBtn-1": "#ADED6B",
        "gray-1": "#f3f4f6",
        "yellow-light": "#EBDD80",
        "dark-bg": "#031011",
        "dark-bg-3": "#072426",
        "dark-bg-4": "#0E4A4E",
        "dark-bg-2": "#031011",
      },
      keyframes: {
        bottom: {
          "0%": { opacity: 0, transform: "translateY(1px)" },
          "50%": { opacity: 0.5 },
          "100%": { opacity: 1, transform: "0" },
        },
        bottom2: {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "50%": { opacity: 0.5 },
          "100%": { opacity: 1, transform: "0" },
        },
        modal: {
          "0%": { opacity: 0, transform: "scale(0.1)" },
          "50%": { opacity: 0, transform: "scale(0.3)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        modalFooter: {
          "0%": { opacity: 0, transform: "scale(0.7)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        left: {
          "0%": { opacity: 0, transform: "translateX(-10px), " },
          "100%": { opacity: 1, transform: "0" },
        },
        right: {
          "0%": { opacity: 0, transform: "translateX(20px), " },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        top: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "0" },
        },
        topCalendar: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "0" },
        },
        menu: {
          "0%": { opacity: 0 },
          "50%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        bottom: "bottom 0.3s ease-in-out",
        bottom2: "bottom2 0.3s ease-in-out",
        left: "left 0.4s ease-in-out",
        right: "right 1s ease-in-out",
        modal: "modal 0.5s ease-in-out",
        modalFooter: "modal 0.2s ease-in-out",
        top: "top 0.4s ease-in-out",
        topCalendar: "top 0.2s ease-in-out",
        menu: "menu 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};

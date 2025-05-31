/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  fontFamily: {
    sans: ["Pretendard", "sans-serif"],
  },
  theme: {
    extend: {
      screens: {
        "max-xxs": { max: "359px" },
        "max-xs": { max: "419px" },
        "max-sm": { max: "639px" },
        "max-md": { max: "767px" },
        "max-lg": { max: "1023px" },
        // 필요시 추가
      },
      colors: {
        "ping-brown": "#DEA154",
      },
      boxShadow: {
        "inner-bottom": "inset 0 -3px 3px -3px rgba(0, 0, 0, 0.3)",
        "top-md": "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
        "top-lg": "0 -6px 10px -1px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};

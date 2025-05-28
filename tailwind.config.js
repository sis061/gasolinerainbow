/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  fontFamily: {
    sans: ["Pretendard", "sans-serif"],
  },
  theme: {
    screens: {
      minUni: { min: "1201px" },
      maxDesktop: { max: "1200px" },
      minDesktop: { min: "901px", max: "1200px" }, // 우선순위 높음
      isDesktopOrLaptop: { max: "1024px" },
      maxLaptop: { max: "900px" },
      iPadMini: { max: "768px" },
      minLaptop: { min: "601px", max: "900px" }, // 우선순위 높음
      maxTablet: { max: "600px" },
      minTablet: { min: "421px", max: "600px" }, // 우선순위 높음
      maxMobile: { max: "420px" },
      xxs: { max: "360px" },
    },
    extend: {
      colors: {
        "ping-brown": "#DEA154",
      },
      boxShadow: {
        "inner-bottom": "inset 0 -3px 3px -3px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};

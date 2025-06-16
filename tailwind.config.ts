import aspectRatio from "@tailwindcss/aspect-ratio";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      overscrollBehavior: {
        contain: "contain",
      },
      screens: {
        "max-xxs": { max: "359px" },
        "max-xs": { max: "419px" },
        "max-sm": { max: "639px" },
        "max-md": { max: "767px" },
        "max-lg": { max: "1023px" },
      },
      boxShadow: {
        "inner-bottom": "inset 0 -3px 3px -3px rgba(0, 0, 0, 0.3)",
        "top-md": "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
        "top-lg": "0 -6px 10px -1px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [aspectRatio],
};

export default config;

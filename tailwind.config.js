/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ping-brown": "#DEA154",
      },
      boxShadow: {
        "inner-bottom": "inset 0 -3px 3px -3px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};

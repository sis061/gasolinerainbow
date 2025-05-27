import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.png", "**/*.svg", "**/*.jpg", "**/*.jpeg"],
  plugins: [react(), tailwindcss(), tsConfigPaths(), svgr()],
  server: {
    host: true,
  },
});

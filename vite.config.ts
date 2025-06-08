import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  assetsInclude: ["**/*.png", "**/*.svg", "**/*.jpg", "**/*.jpeg"],
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    tsConfigPaths(),
    svgr(),
    visualizer({
      open: true, // 분석 결과를 브라우저로 자동 열기
      filename: "bundle-stats.html", // 결과 저장 파일명
      gzipSize: true, // gzip 사이즈도 함께 보기
      brotliSize: true, // brotli 사이즈도 함께 보기
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
  },
  build: {
    target: "es2017", // 낮은 target은 더 큰 polyfill 생성
    minify: "esbuild", // 기본값이지만 명시적으로 설정 추천
    cssCodeSplit: true, // CSS 분할 (기본 true)
    assetsInlineLimit: 8192, // 8KB 이하만 base64로 인라인
    chunkSizeWarningLimit: 500, // 경고 임계치 지정
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-dom/client"],
          framer: ["framer-motion", "motion-dom"],
          radix: ["@radix-ui/react-dialog", "@radix-ui/react-menu"],
          lodash: ["lodash"],
        },
      },
    },
  },
});

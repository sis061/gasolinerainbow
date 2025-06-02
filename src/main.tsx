import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AutoScrollToTop from "./utils/AutoScrollToTop.tsx";
import VideoBackground from "./pages/Layout/components/VideoBackground.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AutoScrollToTop />
      <VideoBackground />
      <App />
    </BrowserRouter>
  </StrictMode>
);

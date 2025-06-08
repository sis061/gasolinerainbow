import { lazy, StrictMode, Suspense, useEffect, useState } from "react";

import "./index.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";

import BarLoader from "react-spinners/BarLoader";
import { motion } from "framer-motion";

import { BrowserRouter } from "react-router-dom";
import AutoScrollToTop from "./utils/AutoScrollToTop.tsx";
const VideoBackground = lazy(
  () => import("./pages/Layout/components/VideoBackground")
);
// import VideoBackground from "./pages/Layout/components/VideoBackground.tsx";

const GlobalFallback = ({ visible }: { visible: boolean }) => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: visible ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    className={`fixed inset-0 bg-black flex flex-col gap-6 items-center justify-center z-[9999] pointer-events-none`}
  >
    <span className="text-xl md:text-2xl !text-white">GRSbH</span>
    <BarLoader color="#ccc" height={6} width={200} />
  </motion.div>
);

function Root() {
  const [videoReady, setVideoReady] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsInitialLoad(false), 200); // 디코딩 시간 고려
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (videoReady && !isInitialLoad) {
      const t = setTimeout(() => setShowFallback(false), 300); // fadeOut 시간 고려
      return () => clearTimeout(t);
    }
  }, [videoReady, isInitialLoad]);

  return (
    <>
      <GlobalFallback visible={showFallback} />
      <div
        className={videoReady ? "opacity-100" : "opacity-0 pointer-events-none"}
      >
        <BrowserRouter>
          <AutoScrollToTop />
          <VideoBackground onReady={() => setVideoReady(true)} />
          <App isInitialLoad={isInitialLoad} />
        </BrowserRouter>
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <Root />
    </Suspense>
  </StrictMode>
);

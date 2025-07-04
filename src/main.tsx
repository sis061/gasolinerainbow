import { lazy, StrictMode, Suspense, useEffect, useState } from "react";

import "./index.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";

import { CircleLoader } from "react-spinners";
import { motion } from "framer-motion";

import { BrowserRouter } from "react-router-dom";
import AutoScrollToTop from "./utils/AutoScrollToTop.tsx";
const VideoBackground = lazy(
  () => import("./pages/Layout/components/VideoBackground")
);
// import VideoBackground from "./pages/Layout/components/VideoBackground.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <Root />
    </Suspense>
  </StrictMode>
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

const GlobalFallback = ({ visible }: { visible: boolean }) => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: visible ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    className={`fixed inset-0 bg-black flex flex-col gap-6 items-center justify-center z-[9999] pointer-events-none`}
  >
    {/* <div className="w-auto min-h-16 flex flex-col items-center justify-center *:transition-all *:duration-300 hover:animate-pulse">
      <p className="text-lg font-extrabold !-mb-2 !mr-6 !text-white">
        GasolineRainbow
      </p>
      <p className="text-md font-extrabold  !ml-5 [&_>span]:text-xl [&_>span]:font-normal *:transition-all *:duration-300 !text-white [&_>span]:!text-white">
        SpilledbyH<span>í</span>M<span>í</span>NN
      </p>
    </div> */}
    {/* <BarLoader color="#ccc" height={6} width={250} /> */}
    <div className="w-auto min-h-16 flex flex-col items-start justify-center *:transition-all *:duration-300 animate-pulse *:!-mb-1">
      <p className="text-lg font-extrabold !text-white">G asoline</p>
      <p className="text-lg font-extrabold !text-white">R ainbow</p>
      <p className="text-md font-extrabold [&_>span]:text-xl [&_>span]:font-normal *:transition-all *:duration-300 !text-white [&_>span]:!text-white">
        S pilled
      </p>
      <p className="text-md font-extrabold [&_>span]:text-xl [&_>span]:font-normal *:transition-all *:duration-300 !text-white [&_>span]:!text-white">
        b y
      </p>
      <p className="text-md font-extrabold [&_>span]:text-xl [&_>span]:font-normal *:transition-all *:duration-300 !text-white [&_>span]:!text-white">
        H <span>í</span>M<span>í</span>NN
      </p>
    </div>
    <CircleLoader
      size={50}
      speedMultiplier={0.75}
      className="
      *:transition-all *:duration-300 animate-pulse
  [&_>span:nth-child(1)]:!border-t-[#ae2323]
  [&_>span:nth-child(1)]:!border-l-[#f26b38]
  [&_>span:nth-child(2)]:!border-t-[#ffef7b]
  [&_>span:nth-child(2)]:!border-l-[#6ec3ff]
  [&_>span:nth-child(3)]:!border-t-[#a66dd4]
  [&_>span:nth-child(3)]:!border-l-[#ff4e50]
  [&_>span:nth-child(4)]:!border-t-[#f26b38]
  [&_>span:nth-child(4)]:!border-l-[#ae2323]
  [&_>span:nth-child(5)]:!border-t-[#6ec3ff]
  [&_>span:nth-child(5)]:!border-l-[#ffef7b]
"
    />
  </motion.div>
);

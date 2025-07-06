import { lazy, StrictMode, Suspense, useEffect, useState } from "react";

import "./index.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";

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
      const t = setTimeout(() => setShowFallback(false), 1500); // fadeOut 시간 고려
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

const GlobalFallback = ({ visible }: { visible: boolean }) => {
  const _p = [
    {
      StrongContent: "G",
      Pcontent: "asoline",
      durationT: 0.5,
    },
    {
      StrongContent: "R",
      Pcontent: "ainbow",
      durationT: 0.3,
    },
    {
      StrongContent: "S",
      Pcontent: "pilled",
      durationT: 0.6,
    },
    {
      StrongContent: "b",
      Pcontent: "y",
      durationT: 0.7,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0.75 }}
      className="fixed inset-0 bg-black flex flex-col gap-6 items-center justify-center z-[9999] pointer-events-none"
    >
      <div
        className="w-auto min-h-16 flex flex-col items-start justify-center !pl-12
          [&_*]:!text-white [&_>p]:text-lg [&_>p]:!text-white/25 [&_>p]:font-extrabold"
      >
        {_p.map((p) => (
          <p>
            <AnimatedStrong
              visible={visible}
              duration={p.durationT}
              content={p.StrongContent}
            />
            {p.Pcontent}
          </p>
        ))}
        <p className="[&_>span]:text-2xl [&_>span]:!text-white/25 [&_>span]:font-normal !-mt-0.5">
          <AnimatedStrong visible={visible} duration={0.4} content="H" />
          <span>í</span>M<span>í</span>NN
        </p>
      </div>
    </motion.div>
  );
};

const AnimatedStrong = ({
  visible,
  duration,
  content,
}: {
  visible: boolean;
  duration: number;
  content: string;
}) => {
  return (
    <motion.strong
      key={visible ? "pulse" : "static"}
      initial={{ opacity: 0.25 }}
      animate={{
        opacity: 1,
        transition: {
          duration: duration,
          repeat: visible ? Infinity : 0,
          repeatType: "reverse",
        },
      }}
    >
      {content}
    </motion.strong>
  );
};

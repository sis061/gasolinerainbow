import type { JSX } from "react";
import { lazy, Suspense } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CircleLoader } from "react-spinners";
import { Route, Routes, useLocation } from "react-router-dom";

import { preloadImages } from "./utils/withImagePreload";
import { commonImages } from "./assets/images/images";

/*----------------------------------*/

// const Home = lazy(() => import("./pages/Home"));
const HomeV2 = lazy(() =>
  import("@/utils/newsPreload").then(({ preloadNewsResources }) =>
    preloadNewsResources().then(() => import("./pages/HomeV2"))
  )
);
const About = lazy(() =>
  preloadImages([commonImages.profileImg]).then(() => import("./pages/About"))
);
const Discography = lazy(() => import("./pages/Discography"));
const AuthorNote = lazy(() => import("./pages/AuthorNote"));
const Note = lazy(() => import("./pages/AuthorNote/Note"));
const News = lazy(() =>
  import("@/utils/newsPreload").then(({ preloadNewsResources }) =>
    preloadNewsResources().then(() => import("./pages/News"))
  )
);
const StreamingRedirect = lazy(() => import("./pages/StreamingRedirect"));

const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const Routers: React.FC<any> = ({
  isInitialLoad,
}: {
  isInitialLoad: boolean;
}): JSX.Element => {
  const location = useLocation();

  const suspenseWrapper = (component: JSX.Element) =>
    isInitialLoad ? (
      component
    ) : (
      <Suspense fallback={<Fallback />}>{component}</Suspense>
    );

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={suspenseWrapper(
            <PageWrapper>
              <HomeV2 />
            </PageWrapper>
          )}
        />
        <Route
          path="*"
          element={suspenseWrapper(
            <PageWrapper>
              <PageNotFound />
            </PageWrapper>
          )}
        />
        <Route
          path="/about"
          element={suspenseWrapper(
            <PageWrapper>
              <About />
            </PageWrapper>
          )}
        />
        <Route
          path="/discography"
          element={suspenseWrapper(
            <PageWrapper>
              <Discography />
            </PageWrapper>
          )}
        />
        <Route path="/authornote">
          <Route
            index
            element={suspenseWrapper(
              <PageWrapper>
                <AuthorNote />
              </PageWrapper>
            )}
          />
          <Route
            path=":idx"
            element={suspenseWrapper(
              <PageWrapper>
                <Note />
              </PageWrapper>
            )}
          />
          <Route
            path=":/*"
            element={suspenseWrapper(
              <PageWrapper>
                <PageNotFound />
              </PageWrapper>
            )}
          />
        </Route>
        <Route
          path="/news"
          element={suspenseWrapper(
            <PageWrapper>
              <News />
            </PageWrapper>
          )}
        />
        <Route path="/stream">
          <Route
            index
            element={suspenseWrapper(
              <PageWrapper>
                <PageNotFound />
              </PageWrapper>
            )}
          />
          <Route
            path=":albumId"
            element={suspenseWrapper(
              <PageWrapper>
                <StreamingRedirect />
              </PageWrapper>
            )}
          />
          <Route
            path=":/*"
            element={suspenseWrapper(
              <PageWrapper>
                <PageNotFound />
              </PageWrapper>
            )}
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default Routers;

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const Fallback = () => (
  <div className="min-h-[calc(100dvh-12rem)] w-screen flex items-center justify-center">
    <CircleLoader
      size={75}
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
  </div>
);

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    // <div>{children}</div>
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.15, ease: "easeInOut" }}
      // className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

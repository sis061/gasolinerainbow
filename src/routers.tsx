import type { JSX } from "react";
import { lazy, Suspense } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { BarLoader } from "react-spinners";
import { Route, Routes, useLocation } from "react-router-dom";

import { preloadImages } from "./utils/withImagePreload";
import { commonImages } from "./assets/images/images";

/*----------------------------------*/

const Home = lazy(() => import("./pages/Home"));
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
const StreamingDetail = lazy(
  () => import("./pages/StreamingRedirect/StreamingDetail")
);
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
              <Home />
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
                <StreamingRedirect />
              </PageWrapper>
            )}
          />
          <Route
            path=":albumId"
            element={suspenseWrapper(
              <PageWrapper>
                <StreamingDetail />
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
    <BarLoader color="#BFBFBF" height={10} speedMultiplier={1} width={200} />
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

import type { JSX } from "react";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BarLoader } from "react-spinners";

/*----------------------------------*/

// import Home from "./pages/Home";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Discography = lazy(() => import("./pages/Discography"));
const AuthorNote = lazy(() => import("./pages/AuthorNote"));
const Note = lazy(() => import("./pages/AuthorNote/Note"));
const News = lazy(() => import("./pages/News"));

const Fallback = () => (
  <div className="min-h-[calc(100dvh-12rem)] w-screen flex items-center justify-center">
    <BarLoader color="#BFBFBF" height={10} speedMultiplier={1} width={200} />
  </div>
);

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

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
              <Home />
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
                <Home />
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
      </Routes>
    </AnimatePresence>
  );
};

export default Routers;

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
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

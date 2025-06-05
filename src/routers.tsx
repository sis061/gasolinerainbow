import type { JSX } from "react";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/*----------------------------------*/

import Home from "./pages/Home";
import { BarLoader } from "react-spinners";
// const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Discography = lazy(() => import("./pages/Discography"));
const AuthorNote = lazy(() => import("./pages/AuthorNote"));
const Note = lazy(() => import("./pages/AuthorNote/Note"));
const News = lazy(() => import("./pages/News"));

const Fallback = () => (
  <div className="min-h-screen w-screen flex items-center justify-center">
    <BarLoader color="#BFBFBF" height={10} speedMultiplier={1} width={200} />
  </div>
);

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const Routers: React.FC<any> = (): JSX.Element => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            // <Suspense fallback={<Fallback />}>
            <PageWrapper>
              <Home />
            </PageWrapper>
            // </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Fallback />}>
              <PageWrapper>
                <Home />
              </PageWrapper>
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Fallback />}>
              <PageWrapper>
                <About />
              </PageWrapper>
            </Suspense>
          }
        />
        <Route
          path="/discography"
          element={
            <Suspense fallback={<Fallback />}>
              <PageWrapper>
                <Discography />
              </PageWrapper>
            </Suspense>
          }
        />

        <Route path="/authornote">
          <Route
            index
            element={
              <Suspense fallback={<Fallback />}>
                <PageWrapper>
                  <AuthorNote />
                </PageWrapper>
              </Suspense>
            }
          />
          <Route
            path=":idx"
            element={
              <Suspense fallback={<Fallback />}>
                <Note />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/news"
          element={
            <Suspense fallback={<Fallback />}>
              <PageWrapper>
                <News />
              </PageWrapper>
            </Suspense>
          }
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
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

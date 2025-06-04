import type { JSX } from "react";

import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/*----------------------------------*/

import AuthorNote from "./pages/AuthorNote";
import Note from "./pages/AuthorNote/Note";
import Discography from "./pages/Discography";
import News from "./pages/News";
import About from "./pages/About";
import Home from "./pages/Home";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

const Routers: React.FC<any> = (): JSX.Element => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="*"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
        <Route
          path="/discography"
          element={
            <PageWrapper>
              <Discography />
            </PageWrapper>
          }
        />

        <Route path="/authornote">
          <Route
            index
            element={
              <PageWrapper>
                <AuthorNote />
              </PageWrapper>
            }
          />
          <Route path=":idx" element={<Note />} />
        </Route>

        <Route
          path="/news"
          element={
            <PageWrapper>
              <News />
            </PageWrapper>
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
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

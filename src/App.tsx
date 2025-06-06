import { AnimatePresence } from "framer-motion";
import Layout from "./pages/Layout/Layout";
import Routers from "./routers";

function App({ isInitialLoad }: { isInitialLoad: boolean }) {
  return (
    <>
      <Layout>
        <AnimatePresence mode="wait">
          <Routers isInitialLoad={isInitialLoad} />
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default App;

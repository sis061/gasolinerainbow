import { AnimatePresence } from "framer-motion";
import Layout from "./pages/Layout/Layout";
import Routers from "./routers";

function App() {
  return (
    <>
      <Layout>
        <AnimatePresence mode="wait">
          <Routers />
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default App;

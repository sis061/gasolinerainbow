import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Layout from "./layout/Layout";

import { Button } from "@/components/ui/button";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <Header />
        <div>
          <Button className="!p-3" variant={"outline"}>
            click me!
          </Button>
        </div>
        <Footer />
      </Layout>
    </>
  );
}

export default App;

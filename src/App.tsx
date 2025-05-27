import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Layout from "./layout/Layout";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <Header />
        <div>
          <h1>프리티어~~</h1>
        </div>
        <Footer />
      </Layout>
    </>
  );
}

export default App;

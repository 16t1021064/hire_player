import { Layout } from "components/Layout";
import { Routes } from "pages/Routes";
import useFontObserver from "hooks/useFontObserver";
import "./App.less";
import LoadingFullpage from "components/LoadingFullpage";

function App() {
  const fontLoaded = useFontObserver();

  return (
    <>
      {!fontLoaded && <LoadingFullpage />}
      <Layout>
        <Routes />
      </Layout>
    </>
  );
}

export default App;

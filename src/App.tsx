import { Routes } from "pages/Routes";
import "./sass/app.sass";
import "./App.sass";
import Layout from "components/Layout";
import "./App.less";

function App() {
  return (
    <>
      <Layout>
        <Routes />
      </Layout>
    </>
  );
}

export default App;

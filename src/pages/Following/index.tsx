import CardPlayer from "components/CardPlayer";
import Header from "components/Header";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { FC } from "react";

const Following: FC = () => {
  return (
    <Layout>
      <div className="page">
        <Sidebar />
        <div className="page__wrapper">
          <Header />
          <div className="page__center">
            <div className="collection">
              <div className="collection__head">
                <div className="collection__title h5">
                  From Player You Follow
                </div>
              </div>
              <div className="collection__list">
                <CardPlayer />
                <CardPlayer />
                <CardPlayer />
                <CardPlayer />
                <CardPlayer />
                <CardPlayer />
                <CardPlayer />
                <CardPlayer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Following;

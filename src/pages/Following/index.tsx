import CardPlayer from "components/CardPlayer";
import Header from "components/Header";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { FC } from "react";
import PlayerImage from "img/player-1.jpeg";

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
                <CardPlayer
                  ava={PlayerImage}
                  name="Player Name"
                  description="Rank up with me"
                  gameCategories="F04,CSGO,LOL,PUBG"
                  classStatus="confirm"
                  price="$60.00/h"
                  start="4.8"
                ></CardPlayer>
                <CardPlayer
                  ava={PlayerImage}
                  name="Player Name"
                  description="Rank up with me"
                  gameCategories="F04,CSGO,LOL,PUBG"
                  classStatus="confirm"
                  price="$60.00/h"
                  start="4.8"
                ></CardPlayer>
                <CardPlayer
                  ava={PlayerImage}
                  name="Player Name"
                  description="Rank up with me"
                  gameCategories="F04,CSGO,LOL,PUBG"
                  classStatus="confirm"
                  price="$60.00/h"
                  start="4.8"
                ></CardPlayer>
                <CardPlayer
                  ava={PlayerImage}
                  name="Player Name"
                  description="Rank up with me"
                  gameCategories="F04,CSGO,LOL,PUBG"
                  classStatus="confirm"
                  price="$60.00/h"
                  start="4.8"
                ></CardPlayer>
                <CardPlayer
                  ava={PlayerImage}
                  name="Player Name"
                  description="Rank up with me"
                  gameCategories="F04,CSGO,LOL,PUBG"
                  classStatus="confirm"
                  price="$60.00/h"
                  start="4.8"
                ></CardPlayer>
                <CardPlayer
                  ava={PlayerImage}
                  name="Player Name"
                  description="Rank up with me"
                  gameCategories="F04,CSGO,LOL,PUBG"
                  classStatus="confirm"
                  price="$60.00/h"
                  start="4.8"
                ></CardPlayer>
                <CardPlayer
                  ava={PlayerImage}
                  name="Player Name"
                  description="Rank up with me"
                  gameCategories="F04,CSGO,LOL,PUBG"
                  classStatus="confirm"
                  price="$60.00/h"
                  start="4.8"
                ></CardPlayer>
                <CardPlayer
                  ava={PlayerImage}
                  name="Player Name"
                  description="Rank up with me"
                  gameCategories="F04,CSGO,LOL,PUBG"
                  classStatus="confirm"
                  price="$60.00/h"
                  start="4.8"
                ></CardPlayer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Following;

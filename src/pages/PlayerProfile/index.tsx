import LoadingFullpage from "components/LoadingFullpage";
import Rating from "components/Rating";
import SimplePanel from "components/SimplePanel";
import { FC, useEffect, useState } from "react";
import { TPlayer } from "types";
import Header from "./Header";
import styles from "./index.module.scss";
import Infomation from "./Infomation";
import { useHistory, useLocation } from "react-router";

export const playerState: string = "playerProfile_player";

const PlayerProfile: FC = () => {
  const [player, setPlayer] = useState<TPlayer | undefined>(undefined);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location?.state && (location.state as any)?.[playerState]) {
      const value = (location.state as any)[playerState];
      if (value) {
        setPlayer(value);
      }
      history.replace({ ...location, state: undefined });
    }
  }, [location]);

  useEffect(() => {
    console.log("player", player);
  }, [player]);

  return player ? (
    <div className={styles.page}>
      <Header player={player} />
      <SimplePanel title={"Information"}>
        <Infomation player={player} />
      </SimplePanel>
      <SimplePanel title={"Rating"}>
        <Rating />
        <Rating />
      </SimplePanel>
    </div>
  ) : (
    <LoadingFullpage />
  );
};

export default PlayerProfile;
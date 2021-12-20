import LoadingFullpage from "components/LoadingFullpage";
import SimplePanel from "components/SimplePanel";
import { FC, useEffect, useState } from "react";
import { TUser } from "types";
import Header from "./Header";
import styles from "./index.module.scss";
import Infomation from "./Infomation";
import { useHistory, useLocation } from "react-router";
import Reviews from "./Reviews";
import { useMutation } from "react-query";
import { getPlayerRequest } from "api/players/request";

export const playerState: string = "playerProfile_player";

const PlayerProfile: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [player, setPlayer] = useState<TUser | undefined>(undefined);

  const { mutate: getPlayer, status: getPlayerStatus } = useMutation(
    getPlayerRequest,
    {
      onSuccess: (data) => {
        if (data.message === "GET_DETAIL_PLAYER_INFO_SUCCESS") {
          if (data.data) {
            setPlayer(data.data);
          } else {
            setPlayer(undefined);
          }
        }
      },
    }
  );

  useEffect(() => {
    if (location?.state && (location.state as any)?.[playerState]) {
      const value = (location.state as any)[playerState];
      if (value) {
        getPlayer(value);
      }
      history.replace({ ...location, state: undefined });
    }
  }, [location]);

  return !player || getPlayerStatus === "loading" ? (
    <LoadingFullpage />
  ) : (
    <div className={styles.page}>
      {player?.playerInfo && <Header player={player.playerInfo} />}
      {player?.playerInfo && (
        <SimplePanel title={"Information"}>
          <Infomation player={player.playerInfo} />
        </SimplePanel>
      )}
      <SimplePanel title={"Rating"}>
        <Reviews receiverId={player?.id} />
      </SimplePanel>
    </div>
  );
};

export default PlayerProfile;

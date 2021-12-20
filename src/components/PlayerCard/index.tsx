import React, { FC } from "react";
import styles from "./index.module.scss";
import DefaultImage from "assets/images/default-image.jpg";
import clsx from "clsx";
import { StarFilled } from "@ant-design/icons";
import { TUser } from "types";
import { useHistory } from "react-router";
import { routesEnum } from "pages/Routes";
import { playerState } from "pages/PlayerProfile";

interface PlayerCardProps {
  player?: TUser;
}

const PlayerCard: FC<PlayerCardProps> = ({ player }) => {
  const history = useHistory();

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (player?.id) {
      history.push(routesEnum.playerProfile, {
        [playerState]: player?.id,
      });
    }
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.preview}>
        <img
          className={styles.pic}
          src={player?.playerInfo?.playerAvatar?.link || DefaultImage}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.title}>
          <div
            className={clsx(
              styles.name,
              player?.playerInfo?.playerVerified ? styles.confirm : undefined
            )}
          >
            {" "}
            {player?.playerInfo?.playerName || "Player Name"}
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.desc}>
            {player?.playerInfo?.description || "Rank up with me"}
          </div>
          <div className={styles.game}>
            {player?.playerInfo?.gameName || "F04, CSGO, LOL, PUBG"}
          </div>
        </div>
      </div>
      <div className={styles.foot}>
        <div className={styles.price}>
          $
          {player?.playerInfo?.costPerHour
            ? player.playerInfo.costPerHour.toFixed(2)
            : 60}
          /h
        </div>
        <StarFilled className={styles.icon} />
        <span className={styles.start}>
          {player?.playerInfo?.avgRating
            ? player.playerInfo.avgRating.toFixed(2)
            : 4.5}
        </span>
      </div>
    </div>
  );
};

export default PlayerCard;

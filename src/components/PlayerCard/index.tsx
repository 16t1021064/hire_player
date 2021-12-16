import React, { FC } from "react";
import styles from "./index.module.scss";
import ThumbnailImage from "./img/player-1.jpeg";
import clsx from "clsx";
import { StarFilled } from "@ant-design/icons";
import { TPlayer } from "types";
import { useHistory } from "react-router";
import { routesEnum } from "pages/Routes";
import { playerState } from "pages/PlayerProfile";

interface PlayerCardProps {
  player?: TPlayer;
}

const PlayerCard: FC<PlayerCardProps> = ({ player }) => {
  const history = useHistory();

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    history.push(routesEnum.playerProfile, {
      [playerState]: player,
    });
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.preview}>
        <img
          className={styles.pic}
          src={player?.images?.[0]?.link || ThumbnailImage}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.title}>
          <div
            className={clsx(
              styles.name,
              player?.playerVerified ? styles.confirm : undefined
            )}
          >
            {" "}
            {player?.playerName || "Player Name"}
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.desc}>
            {player?.description || "Rank up with me"}
          </div>
          <div className={styles.game}>
            {player?.gameName || "F04, CSGO, LOL, PUBG"}
          </div>
        </div>
      </div>
      <div className={styles.foot}>
        <div className={styles.price}>
          ${player?.costPerHour ? player.costPerHour.toFixed(2) : 60}/h
        </div>
        <StarFilled className={styles.icon} />
        <span className={styles.start}>
          {player?.avgRating ? player.avgRating.toFixed(2) : 4.5}
        </span>
      </div>
    </div>
  );
};

export default PlayerCard;

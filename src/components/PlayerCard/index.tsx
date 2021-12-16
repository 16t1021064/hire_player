import { FC } from "react";
import styles from "./index.module.scss";
import ThumbnailImage from "./img/player-1.jpeg";
import clsx from "clsx";
import { StarFilled } from "@ant-design/icons";
import { TPlayerInfo } from "types";

interface PlayerCardProps {
  player?: TPlayerInfo;
}

const PlayerCard: FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className={styles.card}>
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

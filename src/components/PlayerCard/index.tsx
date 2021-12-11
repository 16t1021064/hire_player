import { FC } from "react";
import styles from "./index.module.scss";
import ThumbnailImage from "./img/player-1.jpeg";
import clsx from "clsx";
import { StarFilled } from "@ant-design/icons";

const PlayerCard: FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.preview}>
        <img className={styles.pic} src={ThumbnailImage} />
      </div>
      <div className={styles.body}>
        <div className={styles.title}>
          <div className={clsx(styles.name, styles.confirm)}>Player Name</div>
        </div>
        <div className={styles.description}>
          <div className={styles.desc}>Rank up with me</div>
          <div className={styles.game}>F04, CSGO, LOL, PUBG</div>
        </div>
      </div>
      <div className={styles.foot}>
        <div className={styles.price}>$60.00/h</div>
        <StarFilled className={styles.icon} />
        <span className={styles.start}>4.8</span>
      </div>
    </div>
  );
};

export default PlayerCard;

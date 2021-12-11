import Avatar from "components/Avatar";
import { FC } from "react";
import styles from "./index.module.scss";

const ChatItem: FC = () => {
  return (
    <div className={styles.wrap}>
      <Avatar className={styles.ava} size={"xs"} />
      <div className={styles.details}>
        <div className={styles.top}>
          <div className={styles.man}>Tuong Nguyen</div>
          <div className={styles.time}>1m</div>
        </div>
        <div className={styles.group}>
          <div className={styles.text}>Great!</div>
          <div className={styles.text}>Ok bro!</div>
          <div className={styles.text}>Great bro!</div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;

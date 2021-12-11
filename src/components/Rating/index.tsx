import { FC } from "react";
import styles from "./index.module.scss";
import Avatar from "./img/ava-tuong.jpeg";
import { Rate } from "antd";

const Rating: FC = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.avatar}>
        <img className={styles.pic} src={Avatar} alt={""} />
      </div>
      <div>
        <div className={styles.top}>
          <div className={styles.author}>Tuong Nguyen</div>
          <div className={styles.time}>12h</div>
        </div>
        <div className={styles.text}>Amazing Player. Help me up rank.....</div>
        <div>
          <Rate allowHalf defaultValue={3.5} className={styles.rate} />
        </div>
      </div>
    </div>
  );
};

export default Rating;

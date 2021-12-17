import { FC } from "react";
import styles from "./index.module.scss";
import Avatar from "./img/ava-tuong.jpeg";
import { Rate } from "antd";
import { TPlayer, TReview } from "types";
import TimeAgo from "react-timeago";

interface RatingProps {
  review: TReview;
}

const Rating: FC<RatingProps> = ({ review }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.avatar}>
        <img className={styles.pic} src={Avatar} alt={""} />
      </div>
      <div>
        <div className={styles.top}>
          <div className={styles.author}>
            {(review?.reviewer as TPlayer)?.playerName || "Tuong Nguyen"}
          </div>
          <div className={styles.time}>
            <TimeAgo date={review.createdAt} />
          </div>
        </div>
        <div className={styles.text}>{review.content}</div>
        <div>
          <Rate
            allowHalf
            defaultValue={review.starPoint}
            className={styles.rate}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default Rating;

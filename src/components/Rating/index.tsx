import { FC } from "react";
import styles from "./index.module.scss";
import { Rate } from "antd";
import { TReview, TUser } from "types";
import TimeAgo from "react-timeago";
import Avatar from "components/Avatar";

interface RatingProps {
  review: TReview;
}

const Rating: FC<RatingProps> = ({ review }) => {
  return (
    <div className={styles.wrap}>
      <Avatar
        className={styles.avatar}
        src={(review?.reviewer as TUser)?.avatar?.link}
      />
      <div>
        <div className={styles.top}>
          <div className={styles.author}>
            {(review?.reviewer as TUser)?.userName || "Tuong Nguyen"}
          </div>
          {review?.createdAt && (
            <div className={styles.time}>
              <TimeAgo date={review.createdAt} />
            </div>
          )}
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

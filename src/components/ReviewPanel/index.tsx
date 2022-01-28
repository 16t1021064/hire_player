import { FC } from "react";
import DefaultAvatar from "assets/images/default-avatar.jpg";
import { TReview, TUser } from "types";
import TimeAgo from "react-timeago";
import IonIcon from "@reacticons/ionicons";

interface ReviewPanelProps {
  review: TReview;
}

const ReviewPanel: FC<ReviewPanelProps> = ({ review }) => {
  return (
    <div className="ratings__item">
      <div className="ratings__ava">
        <img
          src={(review?.reviewer as TUser)?.avatar?.link || DefaultAvatar}
          alt=""
          className="ratings__pic"
        />
      </div>
      <div className="ratings__details">
        <div className="ratings__top">
          <div className="ratings__author">
            {(review?.reviewer as TUser)?.userName}
          </div>
          <div className="ratings__time">
            <TimeAgo date={review.createdAt || 0} minPeriod={30} />
          </div>
        </div>
        <div className="ratings__text">{review.content}</div>
        <div className="ratings__stars">
          {[...Array(parseInt(`${review?.starPoint || 0}`)).keys()].map((x) => (
            <IonIcon key={x} className="icon icon-star" name="star" />
          ))}
          {(review?.starPoint || 0) % 1 > 0 && (
            <IonIcon
              className="icon icon-star-half-outline"
              name="star-half-outline"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPanel;

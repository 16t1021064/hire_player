import IonIcon from "@reacticons/ionicons";
import clsx from "clsx";
import { FC } from "react";

interface CardPlayerProps {
  ava?: string;
  name?: string;
  description?: string;
  gameCategories?: string;
  classStatus?: string;
  price?: string;
  start?: string;
}

const CardPlayer: FC<CardPlayerProps> = ({
  ava,
  description,
  gameCategories,
  classStatus,
  name,
  price,
  start,
}) => {
  return (
    <div className="card">
      <div className="card__preview">
        <img src={ava} alt="" className="card__pic" />
      </div>
      <div className="card__body">
        <div className="card__title__player">
          <div className={clsx("card__player__name", classStatus)}>{name}</div>
        </div>
        <div className="card__desc">
          <div className="card__player__desc">{description}</div>
          <div className="card__player__game">{gameCategories}</div>
        </div>
      </div>
      <div className="card__foot">
        <div className="price">{price}</div>
        <IonIcon className="icon icon-star" name="star" />
        <span className="span__start">{start}</span>
      </div>
    </div>
  );
};

export default CardPlayer;

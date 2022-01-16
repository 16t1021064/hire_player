import IonIcon from "@reacticons/ionicons";
import clsx from "clsx";
import React, { FC } from "react";
import { TUser } from "types";
import DefaultImage from "assets/images/default-image.jpg";
import { useHistory } from "react-router-dom";
import { routesEnum } from "pages/Routes";

interface PlayerCardProps {
  player?: TUser;
  ava?: string;
  name?: string;
  description?: string;
  gameCategories?: string;
  classStatus?: string;
  price?: string;
  start?: string;
}

const PlayerCard: FC<PlayerCardProps> = ({ player, classStatus }) => {
  const history = useHistory();

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (player) {
      history.push(routesEnum.playerProfile.replace(":id", player.id));
    }
  };

  return (
    <a className="card" onClick={onClick}>
      <div className="card__preview">
        <img
          src={player?.playerInfo?.playerAvatar?.link || DefaultImage}
          alt=""
          className="card__pic"
        />
      </div>
      <div className="card__body">
        <div className="card__title__player">
          <div
            className={clsx(
              "card__player__name",
              player?.emailVerifiedAt ? "confirm" : undefined,
              classStatus
            )}
          >
            {player?.playerInfo?.playerName || "Player Name"}
          </div>
        </div>
        <div className="card__desc">
          <div className="card__player__desc">
            {player?.playerInfo?.description || "Rank up with me"}
          </div>
          <div className="card__player__game">
            {player?.playerInfo?.gameName || "F04, CSGO, LOL, PUBG"}
          </div>
        </div>
      </div>
      <div className="card__foot">
        <div className="price">
          ${(player?.playerInfo?.costPerHour || 12).toFixed(2)}/h
        </div>
        <IonIcon className="icon icon-star" name="star" />
        <span className="span__start">
          {(player?.playerInfo?.avgRating || 4.8).toFixed(2)}
        </span>
      </div>
    </a>
  );
};

export default PlayerCard;

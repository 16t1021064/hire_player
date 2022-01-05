import React, {
  FC,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import IonIcon from "@reacticons/ionicons";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { getPlayerRequest } from "api/players/request";
import { TReview, TUser } from "types";
import DefaultThumbnail from "assets/images/default-avatar.jpg";
import clsx from "clsx";
import Gallery, { TPhoto } from "components/Gallery";
import { getReviewsRequest } from "api/reviews/request";
import TimeAgo from "react-timeago";
import DefaultAvatar from "assets/images/default-avatar.jpg";
import { openPopup } from "utils/magnific";
import { createHireRequest } from "api/hires/request";

interface RatingProps {
  review: TReview;
}

const Rating: FC<RatingProps> = ({ review }) => {
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
            <TimeAgo date={review.createdAt || 0} />
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

export const playerStateName: string = "playerProfile_player";

const PlayerProfile: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [reviews, setReviews] = useState<TReview[]>([]);
  const modalHireRef = useRef<HTMLDivElement | null>(null);
  const modalDonateRef = useRef<HTMLDivElement | null>(null);
  const modalMessageRef = useRef<HTMLDivElement | null>(null);
  const [player, setPlayer] = useState<TUser | undefined>(undefined);
  const hireHoursRef = useRef<HTMLSelectElement | null>(null);
  const hireMessageRef = useRef<HTMLTextAreaElement | null>(null);

  const { mutate: getPlayer } = useMutation(getPlayerRequest, {
    onSuccess: (data) => {
      if (data.message === "GET_DETAIL_PLAYER_INFO_SUCCESS") {
        if (data.data) {
          setPlayer(data.data);
        } else {
          setPlayer(undefined);
        }
      }
    },
  });

  useEffect(() => {
    if (location?.state && (location.state as any)?.[playerStateName]) {
      const value = (location.state as any)[playerStateName];
      if (value) {
        getPlayer(value);
      }
      // history.replace({ ...location, state: undefined });
    }
  }, [location]);

  useEffect(() => {
    console.log(player);
  }, [player]);

  const photos: TPhoto[] = useMemo(() => {
    return (
      player?.playerInfo?.images?.map((image, pos: number) => ({
        key: `${pos}`,
        src: image.link,
        width: 1,
        height: 1,
      })) || []
    );
  }, [player]);

  const { mutate: fetchReviews } = useMutation(getReviewsRequest, {
    onSuccess: (data) => {
      if (data.message === "GET_REVIEWS_SUCCESS") {
        setReviews([...data.data.results]);
      }
    },
  });

  useEffect(() => {
    if (player) {
      fetchReviews({
        limit: 4,
        page: 1,
        receiverId: player.id,
        populate: "reviewer:userName,avatar",
      });
    }
  }, [player]);

  const onHire = (event: MouseEvent) => {
    event.preventDefault();
    openPopup(modalHireRef.current);
  };

  const onDonate = (event: MouseEvent) => {
    event.preventDefault();
    openPopup(modalDonateRef.current);
  };

  const onMessage = (event: MouseEvent) => {
    event.preventDefault();
    openPopup(modalMessageRef.current);
  };

  const { mutate: createHire, status: createHireStatus } = useMutation(
    createHireRequest,
    {
      onSuccess: (data) => {
        //
      },
    }
  );

  const onSubmit = (event: React.SyntheticEvent) => {
    console.log("a");
    event.preventDefault();
    const hours = parseInt(`${hireHoursRef.current?.value}`) || 0;
    const message = hireMessageRef.current?.value;
    if (createHireStatus !== "loading" && hours && message) {
      createHire({
        playerId: player?.id || "",
        timeRent: hours,
        cost: player?.playerInfo?.costPerHour || 0,
        customerNote: message,
      });
    }
  };

  return player ? (
    <>
      <div className="page__center">
        <div className="author author_big">
          <div className="author__container">
            <div className="author__details">
              <div
                className={clsx(
                  "ava",
                  player?.isOnline ? "ava_online" : undefined
                )}
              >
                <img
                  src={
                    player.playerInfo?.playerAvatar?.link || DefaultThumbnail
                  }
                  alt=""
                  className="ava__pic"
                />
              </div>
              <div className="author__wrap">
                <div
                  className={clsx(
                    "author__man",
                    "h2",
                    player?.emailVerifiedAt ? "confirm" : undefined
                  )}
                >
                  {player?.playerInfo?.playerName || ""}
                </div>
                <div className="author__parameters">
                  <div className="author__parameter">
                    <span>HAS BEEN HIRED</span>
                    <strong>{player?.playerInfo?.totalTimeHired} hour</strong>
                  </div>
                  <div className="author__parameter">
                    <span>COMPLETION RATE </span>
                    <strong>
                      {(player?.playerInfo?.completionRate || 93.67).toFixed(2)}{" "}
                      %
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="author__btns">
              <a
                href=""
                className="author__btn btn btn__small btn_primary"
                onClick={onHire}
              >
                <span className="btn__text">Hire</span>
              </a>
              <a
                href=""
                className="author__btn btn btn__small btn_gray"
                onClick={onDonate}
              >
                <span className="btn__text">Donate</span>
              </a>
              <a
                href=""
                className="author__btn btn btn_gray btn_square"
                onClick={onMessage}
              >
                <IonIcon
                  className="icon icon-chatbubble-ellipses-outline"
                  name="chatbubble-ellipses-outline"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="author__info__content">
          <div className="author__info__title h5">Information</div>
          <div>{player?.playerInfo?.gameName}</div>
          <Gallery photos={photos} />
          <div className="author__info__des">
            {player?.playerInfo?.description}
          </div>
          <div className="author__info__title h5">Rating</div>
          <div className="ratings__row">
            <div className="ratings__container">
              <div className="ratings__list">
                {reviews.map((review: TReview, pos: number) => (
                  <Rating key={pos} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* popup Hire */}
      <div className="popup popup_normal mfp-hide" ref={modalHireRef}>
        <form className="popup__form" onSubmit={onSubmit}>
          <div className="popup__title h5">Hire Player</div>
          <div className="popup__fieldset">
            <div className="popup__row">
              <div className="popup__field field">
                <div className="field__label">Player</div>
                <div className="field__wrap"></div>
                <span>{player.playerInfo?.playerName}</span>
              </div>
              <div className="popup__field field">
                <div className="field__label">Time to rent</div>
                <div className="field__wrap">
                  <select id="" className="field__select" ref={hireHoursRef}>
                    {Array.from(
                      Array(player?.playerInfo?.timeMaxHire || 0).keys()
                    ).map((num) => (
                      <option key={num} value={num + 1}>
                        {num + 1} hour
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="popup__row">
              <div className="popup__field field">
                <div className="field__label">Cost</div>
                <div className="field__wrap">
                  <span>${player.playerInfo?.costPerHour || 0}</span>
                </div>
              </div>
              <div className="popup__field field">
                <div className="field__label">Current balance</div>
                <div className="field__wrap">
                  <span>${player.money?.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="popup__field field">
              <div className="field__label">Message</div>
              <div className="field__wrap">
                <textarea
                  cols={30}
                  rows={10}
                  className="field__textarea"
                  ref={hireMessageRef}
                ></textarea>
              </div>
            </div>
          </div>
          <button type="submit" className="popup__btn btn btn_primary">
            Hire now
          </button>
        </form>
      </div>

      {/* popup donate */}
      <div className="popup popup_normal mfp-hide" ref={modalDonateRef}>
        <form action="" className="popup__form">
          <div className="popup__title h5">Donate Player</div>
          <div className="popup__fieldset">
            <div className="popup__row">
              <div className="popup__field field">
                <div className="field__label">Receiver</div>
                <div className="field__wrap">
                  <span>Tuong Nguyen</span>
                </div>
              </div>
              <div className="popup__field field">
                <div className="field__label">The amount</div>
                <div className="field__wrap">
                  <input type="text" className="field__input" />
                </div>
              </div>
            </div>
            <div className="popup__field field">
              <div className="field__label">Message</div>
              <div className="field__wrap">
                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={10}
                  className="field__textarea"
                ></textarea>
              </div>
            </div>
          </div>
          <button className="popup__btn btn btn_primary">Donate now</button>
        </form>
      </div>

      {/* popup message */}
      <div className="popup popup_normal mfp-hide" ref={modalMessageRef}>
        <form action="" className="popup__form">
          <div className="popup__title h5">Send a message</div>
          <div className="popup__fieldset">
            <div className="popup__field field">
              <div className="field__label">Message</div>
              <div className="field__wrap">
                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={10}
                  className="field__textarea"
                ></textarea>
              </div>
            </div>
          </div>
          <button className="popup__btn btn btn_primary">Send now</button>
        </form>
      </div>
    </>
  ) : (
    <div>404 Not Found</div>
  );
};

export default PlayerProfile;

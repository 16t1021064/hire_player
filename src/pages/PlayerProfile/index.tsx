import React, { FC, useEffect, useMemo, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { getPlayerRequest } from "api/players/request";
import { TReview, TUser } from "types";
import DefaultThumbnail from "assets/images/default-avatar.jpg";
import clsx from "clsx";
import Gallery, { TPhoto } from "components/Gallery";
import { getReviewsRequest } from "api/reviews/request";
import ReviewPanel from "components/ReviewPanel";
import HireModal from "components/HireModal";
import DonateModal from "components/DonateModal";
import MessageModal from "components/MessageModal";
import Button from "components/Button";
import { LoadingFullpage } from "components/LoadingFullpage";
import { Skeleton } from "antd";

const PlayerProfile: FC = () => {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [player, setPlayer] = useState<TUser | undefined>(undefined);
  const [visibleHire, setVisibleHire] = useState<boolean>(false);
  const [visibleDonate, setVisibleDonate] = useState<boolean>(false);
  const [visibleMessage, setVisibleMessage] = useState<boolean>(false);
  const { id }: any = useParams();

  const { mutate: getPlayer, status: getPlayerStatus } = useMutation(
    getPlayerRequest,
    {
      onSuccess: (data) => {
        if (data.message === "GET_DETAIL_PLAYER_INFO_SUCCESS") {
          if (data.data) {
            setPlayer(data.data);
          } else {
            setPlayer(undefined);
          }
        }
      },
    }
  );

  useEffect(() => {
    if (id) {
      getPlayer(id);
    }
  }, [id]);

  const photos: TPhoto[] = useMemo(() => {
    return (
      player?.playerInfo?.images?.map(
        (image): TPhoto => ({
          src: image.link,
          name: image.filename || "",
        })
      ) || []
    );
  }, [player]);

  const { mutate: fetchReviews, status: fetchReviewsStatus } = useMutation(
    getReviewsRequest,
    {
      onSuccess: (data) => {
        if (data.message === "GET_REVIEWS_SUCCESS") {
          setReviews([...data.data.results]);
        }
      },
    }
  );

  useEffect(() => {
    if (player) {
      fetchReviews({
        limit: 4,
        page: 1,
        receiverId: player.id,
        populate: "reviewer:userName,avatar",
        sortBy: "createdAt:desc",
      });
    }
  }, [player]);

  const onHire = () => {
    setVisibleHire(true);
  };

  const onCloseHire = () => {
    setVisibleHire(false);
  };

  const onDonate = () => {
    setVisibleDonate(true);
  };

  const onCloseDonate = () => {
    setVisibleDonate(false);
  };

  const onMessage = () => {
    setVisibleMessage(true);
  };

  const onCloseMessage = () => {
    setVisibleMessage(false);
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
                      {(player?.playerInfo?.completionRate || 0).toFixed(2)} %
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="author__btns">
              <Button
                type="primary"
                size="small"
                className="author__btn"
                onClick={onHire}
              >
                <span className="btn__text">Hire</span>
              </Button>
              <Button
                type="gray"
                size="small"
                className="author__btn"
                onClick={onDonate}
              >
                <span className="btn__text">Donate</span>
              </Button>
              <Button
                type="gray"
                className="author__btn"
                onClick={onMessage}
                square
              >
                <IonIcon
                  className="icon icon-chatbubble-ellipses-outline"
                  name="chatbubble-ellipses-outline"
                />
              </Button>
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
                {fetchReviewsStatus === "loading" ? (
                  <Skeleton />
                ) : (
                  reviews.map((review: TReview, pos: number) => (
                    <ReviewPanel key={pos} review={review} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <HireModal player={player} visible={visibleHire} onClose={onCloseHire} />
      <DonateModal
        player={player}
        visible={visibleDonate}
        onClose={onCloseDonate}
      />
      <MessageModal
        player={player}
        visible={visibleMessage}
        onClose={onCloseMessage}
      />
    </>
  ) : (
    <LoadingFullpage notFound={getPlayerStatus === "loading" ? false : true} />
  );
};

export default PlayerProfile;

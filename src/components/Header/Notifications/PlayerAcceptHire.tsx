import { FC, ReactNode, useEffect, useMemo } from "react";
import TimeAgo from "react-timeago";
import { TUser } from "types";
import { TNotificationTransform } from ".";
import Thumb from "assets/images/default-avatar.jpg";
import { getMessage } from "utils/notifications";
import notify from "utils/notify";

interface TData {
  title: string;
  content: ReactNode;
  time: string;
  thumb: string | undefined;
}

interface PlayerAcceptHireProps {
  notif: TNotificationTransform;
}

const PlayerAcceptHire: FC<PlayerAcceptHireProps> = ({ notif }) => {
  const data: TData = useMemo(() => {
    const content = getMessage(notif);
    const player: TUser = notif?.player as TUser;
    const thumb = player?.playerInfo?.playerAvatar?.link || Thumb;
    const title = player?.playerInfo?.playerName || "";
    return {
      title,
      content,
      thumb,
      time: notif.createdAt || "",
    };
  }, [notif]);

  useEffect(() => {
    if (!notif?.isSocketFrom) {
      return;
    }
    notify(
      {
        message: getMessage(notif) as string,
      },
      "info"
    );
  }, [notif]);

  return (
    <a className="notifications__item">
      <div className="notifications__ava">
        <img src={data.thumb} alt="" className="notifications__pic" />
      </div>
      <div className="notifications__details">
        <div className="notifications__line">
          <div className="notifications__user">{data.title}</div>
          <div className="notifications__time">
            <TimeAgo date={data.time || 0} />
          </div>
        </div>
        <div className="notifications__text">{data.content}</div>
      </div>
    </a>
  );
};

export default PlayerAcceptHire;

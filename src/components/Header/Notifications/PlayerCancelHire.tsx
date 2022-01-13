import { FC, MouseEvent, ReactNode, useEffect, useMemo } from "react";
import { TConversation, THire, TUser } from "types";
import { getMessage } from "utils/notifications";
import { TNotificationTransform } from ".";
import Thumb from "assets/images/default-avatar.jpg";
import TimeAgo from "react-timeago";
import notify from "utils/notify";
import { stepsEnum } from "utils/hires";
import { useHistory } from "react-router-dom";
import { routesEnum } from "pages/Routes";
import { chatDefaultState } from "pages/Chat";

interface TData {
  title: string;
  content: ReactNode;
  time: string;
  thumb: string | undefined;
  conv: string | TConversation | undefined;
}

interface PlayerCancelHireProps {
  notif: TNotificationTransform;
  onSocketChecked: () => void;
}

const PlayerCancelHire: FC<PlayerCancelHireProps> = ({
  notif,
  onSocketChecked,
}) => {
  const data: TData = useMemo(() => {
    const content = getMessage(notif);
    const player: TUser = notif?.player as TUser;
    const conv: string | TConversation | undefined =
      notif?.payload?.conversation;
    const thumb = player?.playerInfo?.playerAvatar?.link || Thumb;
    const title = player?.playerInfo?.playerName || "";
    return {
      title,
      content,
      thumb,
      time: notif.createdAt || "",
      conv,
    };
  }, [notif]);
  const history = useHistory();

  const onAction = () => {
    onSocketChecked();
    let id = undefined;
    if (!data.conv) {
      return;
    } else if (typeof data.conv === "string") {
      id = data.conv;
    } else {
      id = data.conv.id;
    }
    history.push(routesEnum.chat, {
      [chatDefaultState]: id,
    });
  };

  const enableClick = useMemo((): boolean => {
    const hire: THire = notif?.payload?.hire as THire;
    if (hire?.hireStep === stepsEnum.PLAYER_CANCEL && !notif?.isSocketChecked) {
      return true;
    } else {
      return false;
    }
  }, [notif, notif?.isSocketChecked]);

  useEffect(() => {
    if (!notif?.isSocketFrom) {
      return;
    }
    notify(
      {
        message: getMessage(notif) as string,
        onRemoval: (id, removedBy) => {
          if (removedBy === "click" && enableClick) {
            onAction();
          }
        },
      },
      "info"
    );
  }, [notif]);

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    if (enableClick) {
      onAction();
    }
  };

  return (
    <a className="notifications__item" onClick={onClick}>
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

export default PlayerCancelHire;

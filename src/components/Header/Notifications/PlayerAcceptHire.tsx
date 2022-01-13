import { FC, MouseEvent, ReactNode, useEffect, useMemo, useState } from "react";
import TimeAgo from "react-timeago";
import { TConversation, THire, TUser } from "types";
import { TNotificationTransform } from ".";
import Thumb from "assets/images/default-avatar.jpg";
import { getMessage } from "utils/notifications";
import { useHistory } from "react-router-dom";
import { routesEnum } from "pages/Routes";
import { chatDefaultState } from "pages/Chat";
import { stepsEnum } from "utils/hires";
import ConfirmModal from "components/ConfirmModal";

interface TData {
  title: string;
  content: ReactNode;
  time: string;
  thumb: string | undefined;
  conv: string | TConversation | undefined;
}

interface TDataConfirm {
  content: ReactNode | string;
}

interface PlayerAcceptHireProps {
  notif: TNotificationTransform;
  onSocketChecked: () => void;
}

const PlayerAcceptHire: FC<PlayerAcceptHireProps> = ({
  notif,
  onSocketChecked,
}) => {
  const [visibleConfirm, setVisibleConfirm] = useState<boolean>(false);
  const [dataConfirm, setDataConfirm] = useState<TDataConfirm | undefined>(
    undefined
  );
  const data: TData = useMemo(() => {
    const content = getMessage(notif);
    const player: TUser = notif?.player as TUser;
    const thumb = player?.playerInfo?.playerAvatar?.link || Thumb;
    const title = player?.playerInfo?.playerName || "";
    const conv: string | TConversation | undefined =
      notif?.payload?.conversation;
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
    if (hire?.hireStep === stepsEnum.PLAYER_ACCEPT && !notif?.isSocketChecked) {
      return true;
    } else {
      return false;
    }
  }, [notif, notif?.isSocketChecked]);

  useEffect(() => {
    if (!notif?.isSocketFrom) {
      return;
    }
    setDataConfirm({
      content: getMessage(notif) as string,
    });
    setVisibleConfirm(true);
  }, [notif]);

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    if (enableClick) {
      onAction();
    }
  };

  const onCancel = () => {
    setVisibleConfirm(false);
    onSocketChecked();
  };

  const onYes = () => {
    setVisibleConfirm(false);
    onAction();
  };

  return (
    <>
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
      <ConfirmModal
        visible={visibleConfirm}
        onCancel={onCancel}
        textYes={`Chat with player`}
        onYes={onYes}
      >
        {dataConfirm?.content}
      </ConfirmModal>
    </>
  );
};

export default PlayerAcceptHire;

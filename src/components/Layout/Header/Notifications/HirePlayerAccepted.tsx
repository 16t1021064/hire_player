import { FC, MouseEvent, ReactNode, useEffect, useMemo, useState } from "react";
import TimeAgo from "react-timeago";
import { TNotificationTransform } from ".";
import Thumb from "assets/images/default-avatar.jpg";
import { getMessage } from "utils/notifications";
import { useHistory } from "react-router-dom";
import { routesEnum } from "pages/Routes";
import { chatDefaultState } from "pages/Chat";
import ConfirmModal from "components/ConfirmModal";
import { THirePlayerAcceptedPayload } from "types/notifications";

interface TData {
  title: string;
  content: ReactNode;
  time: string;
  thumb: string | undefined;
  convId: string | undefined;
  hireId: string | undefined;
}

interface TDataConfirm {
  content: ReactNode | string;
}

interface HirePlayerAcceptedProps {
  notif: TNotificationTransform;
  fnClose: () => void;
}

const HirePlayerAccepted: FC<HirePlayerAcceptedProps> = ({
  notif,
  fnClose,
}) => {
  const [visibleConfirm, setVisibleConfirm] = useState<boolean>(false);
  const [dataConfirm, setDataConfirm] = useState<TDataConfirm | undefined>(
    undefined
  );
  const history = useHistory();

  const data: TData = useMemo(() => {
    const payload = notif.payload as THirePlayerAcceptedPayload;
    return {
      title: notif.player?.playerInfo?.playerName || "Hire",
      content: getMessage(notif),
      thumb: notif.image?.link || Thumb,
      time: notif.createdAt || "",
      convId: payload.conversationId,
      hireId: payload.hireId,
    };
  }, [notif]);

  const gotoConv = () => {
    history.push(routesEnum.chat, {
      [chatDefaultState]: data.convId,
    });
  };

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
    if (visibleConfirm) return;
    fnClose();
    gotoConv();
  };

  const onCancel = () => {
    setVisibleConfirm(false);
  };

  const onYes = () => {
    setVisibleConfirm(false);
    gotoConv();
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

export default HirePlayerAccepted;

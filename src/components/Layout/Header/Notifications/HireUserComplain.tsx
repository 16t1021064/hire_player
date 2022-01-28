import { FC, MouseEvent, ReactNode, useEffect, useMemo } from "react";
import { getMessage } from "utils/notifications";
import { TNotificationTransform } from ".";
import Thumb from "assets/images/default-avatar.jpg";
import TimeAgo from "react-timeago";
import notify from "utils/notify";
import { useHistory } from "react-router-dom";
import { routesEnum } from "pages/Routes";
import { chatDefaultState } from "pages/Chat";
import { THireUserComplainPayload } from "types/notifications";
import { useAppSelector } from "hooks/useRedux";
import { isAdmin } from "utils/auth";
import { useMutation } from "react-query";
import { adminJoinRequest } from "api/conversations/request";

interface TData {
  title: string;
  content: ReactNode;
  time: string;
  thumb: string | undefined;
  convId: string | undefined;
}

interface HireUserComplainProps {
  notif: TNotificationTransform;
  fnClose: () => void;
}

const HireUserComplain: FC<HireUserComplainProps> = ({ notif, fnClose }) => {
  const data: TData = useMemo(() => {
    const payload = notif.payload as THireUserComplainPayload;
    return {
      title: notif.player?.playerInfo?.playerName || "Hire",
      content: getMessage(notif),
      thumb: notif.image?.link || Thumb,
      time: notif.createdAt || "",
      convId: payload.conversationId,
    };
  }, [notif]);
  const history = useHistory();
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const { mutate: adminJoin, status: adminJoinStatus } = useMutation(
    adminJoinRequest,
    {
      onSuccess: (resData) => {
        history.push(routesEnum.chat, {
          [chatDefaultState]: resData.data.id,
        });
      },
    }
  );

  const gotoConv = () => {
    if (adminJoinStatus === "loading") {
      return;
    }
    let playerId: string = notif.player?.id || "";

    if (playerId === userInfo?.id) {
      history.push(routesEnum.chat, {
        [chatDefaultState]: data.convId,
      });
    } else if (userInfo && isAdmin(userInfo) && data.convId) {
      adminJoin({ conversationId: data.convId });
    }
  };

  useEffect(() => {
    if (!notif?.isSocketFrom) {
      return;
    }
    notify(
      {
        message: getMessage(notif) as string,
        onRemoval: (id, removedBy) => {
          if (removedBy === "click") {
            gotoConv();
          }
        },
      },
      "info"
    );
  }, [notif]);

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    fnClose();
    gotoConv();
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
            <TimeAgo date={data.time || 0} minPeriod={30} />
          </div>
        </div>
        <div className="notifications__text">{data.content}</div>
      </div>
    </a>
  );
};

export default HireUserComplain;

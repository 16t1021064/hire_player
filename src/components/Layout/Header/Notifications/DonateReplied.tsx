import { FC, MouseEvent, ReactNode, useEffect, useMemo } from "react";
import { getMessage } from "utils/notifications";
import { TNotificationTransform } from ".";
import Thumb from "assets/images/default-avatar.jpg";
import TimeAgo from "react-timeago";
import notify from "utils/notify";
import { useHistory } from "react-router-dom";
import { routesEnum } from "pages/Routes";
import { TDonateRepliedPayload } from "types/notifications";

interface TData {
  title: string;
  content: ReactNode;
  time: string;
  thumb: string | undefined;
  donateId: string | undefined;
}

interface DonateRepliedProps {
  notif: TNotificationTransform;
  fnClose: () => void;
}

const DonateReplied: FC<DonateRepliedProps> = ({ notif, fnClose }) => {
  const data: TData = useMemo(() => {
    const payload = notif.payload as TDonateRepliedPayload;
    return {
      title: "Donate",
      content: getMessage(notif),
      thumb: notif.image?.link || Thumb,
      time: notif.createdAt || "",
      donateId: payload.donateId,
    };
  }, [notif]);
  const history = useHistory();

  const gotoList = () => {
    history.push(routesEnum.settings_userDonates);
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
            gotoList();
          }
        },
      },
      "info"
    );
  }, [notif]);

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    fnClose();
    gotoList();
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

export default DonateReplied;

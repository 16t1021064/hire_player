import { FC, MouseEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { HireStepsEnum, TConversation, THire, TUser } from "types";
import { message } from "antd";
import { useMutation } from "react-query";
import { getMessage } from "utils/notifications";
import Thumb from "assets/images/default-avatar.jpg";
import TimeAgo from "react-timeago";
import notify from "utils/notify";
import { TNotificationTransform } from ".";
import { useHistory } from "react-router-dom";
import { routesEnum } from "pages/Routes";
import { chatDefaultState } from "pages/Chat";
import ConfirmModal from "components/ConfirmModal";
import {
  playerAcceptHireRequest,
  playerCancelHireRequest,
} from "api/hires/request";

interface TData {
  hireId: string;
  title: string;
  content: ReactNode;
  time: string;
  thumb: string | undefined;
  customer: TUser | undefined;
  hire: THire | undefined;
  conv: string | TConversation | undefined;
}

interface CustomerRequestHireProps {
  notif: TNotificationTransform;
  onSocketChecked: () => void;
}

const CustomerRequestHire: FC<CustomerRequestHireProps> = ({
  notif,
  onSocketChecked,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const history = useHistory();

  const data: TData = useMemo(() => {
    const content = getMessage(notif);
    const customer: TUser = notif?.customer as TUser;
    const hire: THire = notif?.payload?.hire as THire;
    const thumb = customer?.avatar?.link || Thumb;
    const title = customer?.userName || "";
    const hireId = hire?.id || "";
    const conv: string | TConversation | undefined =
      notif?.payload?.conversation;
    return {
      hireId,
      title,
      content,
      thumb,
      time: notif.createdAt || "",
      customer,
      hire,
      conv,
    };
  }, [notif]);

  const enableClick = useMemo((): boolean => {
    const hire: THire = notif?.payload?.hire as THire;
    if (hire?.hireStep === HireStepsEnum.WAITING && !notif?.isSocketChecked) {
      return true;
    } else {
      return false;
    }
  }, [notif, notif?.isSocketChecked]);

  const { mutate: playerAccept, status: playerAcceptStatus } = useMutation(
    playerAcceptHireRequest,
    {
      onSuccess: () => {
        setVisible(false);
        onSocketChecked();
        message.success("You have accepted a hire");
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
      },
    }
  );

  const { mutate: playerCancel, status: playerCancelStatus } = useMutation(
    playerCancelHireRequest,
    {
      onSuccess: () => {
        setVisible(false);
        message.info("You have canceled a hire");
        onSocketChecked();
      },
    }
  );

  const freezy = useMemo(
    () => playerAcceptStatus === "loading" || playerCancelStatus === "loading",
    [playerAcceptStatus, playerCancelStatus]
  );

  const showConfirm = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (!notif?.isSocketFrom) {
      return;
    }
    notify(
      {
        message: getMessage(notif) as string,
        onRemoval: (id, removedBy) => {
          if (removedBy === "click" && enableClick) {
            showConfirm();
          }
        },
      },
      "info"
    );
  }, [notif]);

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    if (enableClick) {
      showConfirm();
    }
  };

  const onCancel = () => {
    if (!freezy) {
      setVisible(false);
    }
  };

  const onDeny = () => {
    playerCancel({ id: data.hireId, cancelReason: "busy" });
  };

  const onAccept = () => {
    playerAccept({ id: data.hireId });
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
      {enableClick && (
        <ConfirmModal
          visible={visible}
          title={`Accept hire request from ${data.customer?.userName}`}
          freezy={freezy}
          onCancel={onCancel}
          enableNo={true}
          onNo={onDeny}
          loadingNo={playerCancelStatus === "loading"}
          textNo={"Deny"}
          onYes={onAccept}
          loadingYes={playerAcceptStatus === "loading"}
          textYes={"Apcept"}
        >
          {data?.hire?.customerNote}
        </ConfirmModal>
      )}
    </>
  );
};

export default CustomerRequestHire;

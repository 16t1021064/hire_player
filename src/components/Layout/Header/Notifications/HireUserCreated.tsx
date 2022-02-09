import { FC, MouseEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { HireStepsEnum, TConversation } from "types";
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
  getHireRequest,
  playerAcceptHireRequest,
  playerCancelHireRequest,
} from "api/hires/request";
import { THireUserCreatedPayload } from "types/notifications";

interface TData {
  title: string;
  content: ReactNode;
  time: string;
  thumb: string | undefined;
  hireId: string | undefined;
  convId: string | undefined;
  customerName: string;
  note: string;
}

interface HireUserCreatedProps {
  notif: TNotificationTransform;
  fnClose: () => void;
}

const HireUserCreated: FC<HireUserCreatedProps> = ({ notif, fnClose }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const history = useHistory();

  const data: TData = useMemo(() => {
    const payload = notif.payload as THireUserCreatedPayload;
    return {
      title: notif.customer?.userName || "Hire",
      content: getMessage(notif),
      thumb: notif.image?.link || Thumb,
      time: notif.createdAt || "",
      hireId: payload.hireId,
      convId: payload.conversationId,
      customerName: notif.customer?.userName || "",
      note: payload.customerNote || "",
    };
  }, [notif]);

  const { mutate: playerAccept, status: playerAcceptStatus } = useMutation(
    playerAcceptHireRequest,
    {
      onSuccess: () => {
        setVisible(false);
        message.success("You have accepted a hire");
        if (data.convId) {
          history.push(routesEnum.chat, {
            [chatDefaultState]: data.convId,
          });
        }
      },
    }
  );

  const { mutate: playerCancel, status: playerCancelStatus } = useMutation(
    playerCancelHireRequest,
    {
      onSuccess: () => {
        setVisible(false);
        message.info("You have canceled a hire");
      },
    }
  );

  const { mutate: getHire, status: getHireStatus } = useMutation(
    getHireRequest,
    {
      onSuccess: (data) => {
        if (data.data.hireStep === HireStepsEnum.USER_CREATED) {
          setVisible(true);
          return;
        }
        let convId = undefined;
        if (typeof data.data.conversation === "string") {
          convId = data.data.conversation;
        } else if (typeof data.data.conversation === "object") {
          convId = (data.data.conversation as TConversation).id;
        }
        if (convId) {
          history.push(routesEnum.chat, {
            [chatDefaultState]: convId,
          });
        }
      },
    }
  );

  const freezy = useMemo(
    () =>
      playerAcceptStatus === "loading" ||
      playerCancelStatus === "loading" ||
      getHireStatus === "loading",
    [playerAcceptStatus, playerCancelStatus, getHireStatus]
  );

  const onAction = () => {
    if (!data.hireId || freezy) return;
    fnClose();
    getHire({
      id: data.hireId,
    });
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
            onAction();
          }
        },
      },
      "info"
    );
  }, [notif]);

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    onAction();
  };

  const onCancel = () => {
    if (!freezy) {
      setVisible(false);
    }
  };

  const onDeny = () => {
    if (!data.hireId) return;
    playerCancel({ id: data.hireId, cancelReason: "busy" });
  };

  const onAccept = () => {
    if (!data.hireId) return;
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
              <TimeAgo date={data.time || 0} minPeriod={30} />
            </div>
          </div>
          <div className="notifications__text">{data.content}</div>
        </div>
      </a>
      <ConfirmModal
        visible={visible}
        title={`Accept hire request from ${data.customerName}`}
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
        {data.note}
      </ConfirmModal>
    </>
  );
};

export default HireUserCreated;

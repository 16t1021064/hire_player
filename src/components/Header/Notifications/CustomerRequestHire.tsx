import { FC, MouseEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { THire, TUser } from "types";
import { Button, Col, message, Modal as AntdModal, Row } from "antd";
import { useMutation } from "react-query";
import {
  playerAcceptHireRequest,
  playerCancelHireRequest,
} from "api/notifications/request";
import { getMessage } from "utils/notifications";
import Thumb from "assets/images/default-avatar.jpg";
import TimeAgo from "react-timeago";
import notify from "utils/notify";
import { TNotificationTransform } from ".";

interface TData {
  hireId: string;
  title: string;
  content: ReactNode;
  time: string;
  thumb: string | undefined;
}

interface CustomerRequestHireProps {
  notif: TNotificationTransform;
}

const CustomerRequestHire: FC<CustomerRequestHireProps> = ({ notif }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const data: TData = useMemo(() => {
    const content = getMessage(notif);
    const customer: TUser = notif?.customer as TUser;
    const hire: THire = notif?.payload?.hire as THire;
    const thumb = customer?.avatar?.link || Thumb;
    const title = customer?.userName || "";
    const hireId = hire?.id || "";
    return {
      hireId,
      title,
      content,
      thumb,
      time: notif.createdAt || "",
    };
  }, [notif]);

  const { mutate: playerAccept, status: playerAcceptStatus } = useMutation(
    playerAcceptHireRequest,
    {
      onSuccess: () => {
        setVisible(false);
        message.success("You have accepted a hire");
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

  const freezy = useMemo(
    () => playerAcceptStatus === "loading" || playerCancelStatus === "loading",
    [playerAcceptStatus, playerCancelStatus]
  );

  const showConfirm = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (!notif?.fromSocket) {
      return;
    }
    notify(
      {
        message: getMessage(notif) as string,
        onRemoval: (id, removedBy) => {
          if (removedBy === "click") {
            showConfirm();
          }
        },
      },
      "info"
    );
  }, [notif]);

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    showConfirm();
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
      <AntdModal
        visible={visible}
        title="Ready to accept the hire ?"
        footer={
          <Row gutter={[8, 8]} justify="end">
            <Col>
              <Button type="default" onClick={onCancel} disabled={freezy}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                danger
                disabled={freezy}
                onClick={onDeny}
                loading={playerCancelStatus === "loading"}
              >
                Deny
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                disabled={freezy}
                onClick={onAccept}
                loading={playerAcceptStatus === "loading"}
              >
                Apcept
              </Button>
            </Col>
          </Row>
        }
        onCancel={onCancel}
      >
        When accepting a hire, you will discus on game with customer directly on
        chatbox, and you can not get hire anymore while you play game
      </AntdModal>
    </>
  );
};

export default CustomerRequestHire;
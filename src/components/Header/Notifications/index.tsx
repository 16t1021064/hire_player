import IonIcon from "@reacticons/ionicons";
import { FC, Fragment, MouseEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { getNotificationsRequest } from "api/notifications/request";
import { useAppSelector } from "hooks/useRedux";
import { TNotification } from "types";
import { actionsEnum } from "utils/notifications";
import clsx from "clsx";
import CustomerRequestHire from "./CustomerRequestHire";
import PlayerCancelHire from "./PlayerCancelHire";
import useSocket from "hooks/useSocket";
import {
  TEventData_StartOnline,
  TListenerData_OnNotifications,
  TListenerData_OnStartOnline,
} from "socket/types";
import { SocketEvents, SocketListeners } from "socket";

const LIMIT = 10;

export interface TNotificationTransform extends TNotification {
  fromSocket?: boolean;
}

const Notifications: FC = () => {
  const { userInfo, isLogin } = useAppSelector((state) => state.auth);
  const [items, setItems] = useState<TNotificationTransform[]>([]);
  const [total, setTotal] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const handleOnNotifsRef = useRef<
    ((data: TListenerData_OnNotifications) => void) | null
  >(null);
  const { socket, connected } = useSocket();

  useEffect(() => {
    const callback = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", callback);

    return () => {
      document.removeEventListener("mousedown", callback);
    };
  }, []);

  const onShow = (event: MouseEvent) => {
    event.preventDefault();
    // burgerHeader.removeClass("active");
    // sidebar.removeClass("visible");
    // search.slideUp();
    // items.removeClass("active");
    console.log("inside");
    setVisible(true);
  };

  useEffect(() => {
    if (connected && userInfo) {
      const startOnlineData: TEventData_StartOnline = {
        userId: userInfo.id,
      };
      socket?.emit(SocketEvents.startOnline, startOnlineData);

      socket?.on(
        SocketListeners.onStartOnline,
        (data: TListenerData_OnStartOnline) => {
          console.log(SocketListeners.onStartOnline, data.UsersOnline);
        }
      );
    }
  }, [connected, userInfo]);

  const handleOnNotifs = (data: TListenerData_OnNotifications) => {
    console.log(SocketListeners.onNotifications, data);
    const transfrom: TNotificationTransform = data as TNotificationTransform;
    transfrom.fromSocket = true;
    setItems([transfrom].concat(items));
    setTotal(total + 1);
  };

  useEffect(() => {
    if (!connected) {
      return;
    }
    if (handleOnNotifsRef.current) {
      socket?.removeListener(
        SocketListeners.onNotifications,
        handleOnNotifsRef.current
      );
    }
    handleOnNotifsRef.current = handleOnNotifs;
    socket?.on(SocketListeners.onNotifications, handleOnNotifsRef.current);
  }, [connected]);

  const { mutate: fetch } = useMutation(getNotificationsRequest, {
    onSuccess: (data) => {
      setItems(data.data.results);
      setTotal(data.data.totalResults);
    },
  });

  useEffect(() => {
    if (userInfo) {
      fetch({
        limit: LIMIT,
        page: 1,
        populate: "customer|player|payload.hire|payload.conversation",
        sortBy: "createdAt:desc",
      });
    }
  }, [userInfo]);

  const renderItem: any = (notif: TNotification) => {
    switch (notif.action) {
      case actionsEnum.CUSTOMER_REQUEST_HIRE:
        return <CustomerRequestHire notif={notif} />;
      case actionsEnum.PLAYER_CANCEL_HIRE:
        return <PlayerCancelHire notif={notif} />;
      default:
        return <></>;
    }
  };

  return isLogin ? (
    <div
      className={clsx(
        "header__item header__item_notifications js-header-item",
        visible && "active"
      )}
      ref={wrapperRef}
    >
      <button className="header__head js-header-head" onClick={onShow}>
        <IonIcon
          className="icon icon-notifications-outline"
          name="notifications-outline"
        />
        <div className="header__counter">{total}</div>
      </button>
      <div className={"header__body js-header-body"}>
        <div className="notifications">
          <div className="notifications__info h6">Recent Notification</div>
          <div className="notifications__list">
            {items.map((item, pos) => (
              <Fragment key={pos}>{renderItem(item)}</Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Notifications;

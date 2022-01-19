import IonIcon from "@reacticons/ionicons";
import {
  FC,
  Fragment,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMutation } from "react-query";
import {
  getNotificationsRequest,
  getTotalUnreadRequest,
  readNotificationsRequest,
} from "api/notifications/request";
import { useAppSelector } from "hooks/useRedux";
import { TPagination } from "types";
import clsx from "clsx";
import CustomerRequestHire from "./CustomerRequestHire";
import PlayerCancelHire from "./PlayerCancelHire";
import useSocket from "hooks/useSocket";
import {
  TEventData_StartOnline,
  TListenerData_OnNotifications,
} from "socket/types";
import { SocketEvents, SocketListeners } from "socket";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import styles from "./index.module.sass";
import PlayerAcceptHire from "./PlayerAcceptHire";
import { NotificationActionsEnum, TNotification } from "types/notifications";
import CustomerFinishSoon from "./CustomerFinishSoon";
import CustomerCancelHire from "./CustomerCancelHire";

export interface TNotificationTransform extends TNotification {
  isSocketFrom?: boolean;
  isSocketChecked?: boolean;
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
  const lastestIdRef = useRef<string | undefined>(undefined);
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  });

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
    setVisible(true);
  };

  useEffect(() => {
    if (connected && userInfo) {
      const startOnlineData: TEventData_StartOnline = {
        userId: userInfo.id,
      };
      socket?.emit(SocketEvents.startOnline, startOnlineData);
    }
  }, [connected, userInfo]);

  const handleOnNotifs = (data: TListenerData_OnNotifications) => {
    const transfrom: TNotificationTransform = data as TNotificationTransform;
    transfrom.isSocketFrom = true;
    transfrom.isSocketChecked = false;
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

  const { mutate: fetch, status: fetchStatus } = useMutation(
    getNotificationsRequest,
    {
      onSuccess: (data) => {
        const len = data.data.results.length;
        if (len > 0) {
          lastestIdRef.current = data.data.results[len - 1].id;
        }
        setPagination({
          ...pagination,
          page: data.data.page,
          limit: data.data.limit,
          totalPages: data.data.totalPages,
          totalResults: data.data.totalResults,
        });
        setItems(items.concat(data.data.results));
      },
    }
  );

  const { mutate: getTotalUnread } = useMutation(getTotalUnreadRequest, {
    onSuccess: (data) => {
      setTotal(data.data.count);
    },
  });

  useEffect(() => {
    if (userInfo) {
      fetch({
        limit: pagination.limit,
        page: 1,
        sortBy: "createdAt:desc",
      });
      getTotalUnread();
    }
  }, [userInfo]);

  const fnClose = () => {
    setVisible(false);
  };

  const renderItem: any = (notif: TNotification) => {
    switch (notif.action) {
      case NotificationActionsEnum.CUSTOMER_REQUEST_HIRE:
        return <CustomerRequestHire notif={notif} fnClose={fnClose} />;
      case NotificationActionsEnum.PLAYER_CANCEL_HIRE:
        return <PlayerCancelHire notif={notif} fnClose={fnClose} />;
      case NotificationActionsEnum.PLAYER_ACCEPT_HIRE:
        return <PlayerAcceptHire notif={notif} fnClose={fnClose} />;
      case NotificationActionsEnum.CUSTOMER_FINISH_SOON:
        return <CustomerFinishSoon notif={notif} fnClose={fnClose} />;
      case NotificationActionsEnum.CUSTOMER_CANCEL_HIRE:
        return <CustomerCancelHire notif={notif} fnClose={fnClose} />;
      default:
        return <></>;
    }
  };

  const hasMore = useMemo((): boolean => {
    if (
      pagination.limit &&
      pagination.totalResults &&
      pagination.limit < pagination.totalResults
    ) {
      return true;
    } else {
      return false;
    }
  }, [pagination]);

  const fetchMore = () => {
    if (hasMore && fetchStatus !== "loading") {
      fetch({
        limit: pagination.limit,
        page: 1,
        sortBy: "createdAt:desc",
        latestId: lastestIdRef.current,
      });
    }
  };

  const { mutate: readNotifications } = useMutation(readNotificationsRequest, {
    onSuccess: () => {
      setTotal(0);
    },
  });

  useEffect(() => {
    if (visible) {
      readNotifications();
    }
  }, [visible]);

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
        <div className={clsx("notifications", styles.notifications)}>
          <div className="notifications__info h6">Recent Notification</div>
          <div
            id="notificationsScroll"
            className={clsx("notifications__list", styles.list)}
          >
            <InfiniteScroll
              className={styles.scroll}
              dataLength={items.length || 0}
              next={fetchMore}
              hasMore={hasMore}
              loader={
                <Row justify="center">
                  <Col>
                    <LoadingOutlined className={styles.loading} />
                  </Col>
                </Row>
              }
              scrollableTarget="notificationsScroll"
            >
              {items.map((item, pos: number) => (
                <Fragment key={pos}>{renderItem(item, pos)}</Fragment>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Notifications;

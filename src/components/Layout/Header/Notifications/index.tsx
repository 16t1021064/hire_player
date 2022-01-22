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
import HireUserCreated from "./HireUserCreated";
import HirePlayerDenied from "./HirePlayerDenied";
import { TListenerData_OnNotifications } from "socket/types";
import { SocketListeners } from "socket";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import styles from "./index.module.sass";
import HirePlayerAccepted from "./HirePlayerAccepted";
import { NotificationActionsEnum, TNotification } from "types/notifications";
import HireUserFinished from "./HireUserFinished";
import HireUserCanceled from "./HireUserCanceled";
import HireUserComplain from "./HireUserComplain";
import ConversationAdminJoined from "./ConversationAdminJoined";
import HireAdminRefunded from "./HireAdminRefunded";
import { Socket } from "socket.io-client";
import ReviewUserRated from "./ReviewUserRated";

export interface TNotificationTransform extends TNotification {
  isSocketFrom?: boolean;
  isSocketChecked?: boolean;
}

interface NotificationsProps {
  socketInstance: Socket | undefined;
  socketConnected: boolean;
}

const Notifications: FC<NotificationsProps> = ({
  socketInstance,
  socketConnected,
}) => {
  const { userInfo, isLogin } = useAppSelector((state) => state.auth);
  const [items, setItems] = useState<TNotificationTransform[]>([]);
  const [total, setTotal] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const handleOnNotifsRef = useRef<
    ((data: TListenerData_OnNotifications) => void) | null
  >(null);
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

  const handleOnNotifs = (data: TListenerData_OnNotifications) => {
    const transfrom: TNotificationTransform = data as TNotificationTransform;
    transfrom.isSocketFrom = true;
    transfrom.isSocketChecked = false;
    setItems([transfrom].concat(items));
    setTotal(total + 1);
  };

  useEffect(() => {
    if (!socketConnected) {
      return;
    }
    if (handleOnNotifsRef.current) {
      socketInstance?.removeListener(
        SocketListeners.onNotifications,
        handleOnNotifsRef.current
      );
    }
    handleOnNotifsRef.current = handleOnNotifs;
    socketInstance?.on(
      SocketListeners.onNotifications,
      handleOnNotifsRef.current
    );
  }, [socketConnected]);

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
      case NotificationActionsEnum.HIRE_USER_CREATED:
        return <HireUserCreated notif={notif} fnClose={fnClose} />;
      case NotificationActionsEnum.HIRE_PLAYER_DENIED:
        return <HirePlayerDenied notif={notif} fnClose={fnClose} />;
      case NotificationActionsEnum.HIRE_PLAYER_ACCEPTED:
        return <HirePlayerAccepted notif={notif} fnClose={fnClose} />;
      case NotificationActionsEnum.HIRE_USER_FINISHED:
        return <HireUserFinished notif={notif} fnClose={fnClose} />;
      case NotificationActionsEnum.HIRE_USER_CANCELED:
        return <HireUserCanceled notif={notif} fnClose={fnClose} />;
      case NotificationActionsEnum.HIRE_USER_COMPLAIN:
        return <HireUserComplain notif={notif} fnClose={fnClose} />;
      case NotificationActionsEnum.CONVERSATION_ADMIN_JOINED:
        return <ConversationAdminJoined notif={notif} fnClose={fnClose} />;
      case NotificationActionsEnum.HIRE_ADMIN_REFUNDED:
        return <HireAdminRefunded notif={notif} fnClose={fnClose} />;
      case NotificationActionsEnum.REVIEW_USER_RATED:
        return <ReviewUserRated notif={notif} />;
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

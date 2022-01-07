import IonIcon from "@reacticons/ionicons";
import { FC, MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import DefaultThumbnail from "assets/images/default-avatar.jpg";
import { useMutation } from "react-query";
import { getNotificationsRequest } from "api/notifications/request";
import { useAppSelector } from "hooks/useRedux";
import { TNotification } from "types";
import { getRenderData } from "utils/notifications";
import clsx from "clsx";
import TimeAgo from "react-timeago";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal as AntdModal } from "antd";

const LIMIT = 10;

const { confirm } = AntdModal;

export interface TNotificationRenderItem {
  title: string;
  content: ReactNode;
  time: string;
  thumb: string | undefined;
}

const Notifications: FC = () => {
  const { userInfo, isLogin } = useAppSelector((state) => state.auth);
  const [items, setItems] = useState<TNotification[]>([]);
  const [total, setTotal] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

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

  const { mutate: fetch } = useMutation(getNotificationsRequest, {
    onSuccess: (data) => {
      console.log(data);
      setItems(data.data.results);
      setTotal(data.data.totalResults);
    },
  });

  useEffect(() => {
    if (userInfo) {
      fetch({
        limit: LIMIT,
        page: 1,
        populate: "customer|payload.hire|payload.conversation",
        sortBy: "createdAt:desc",
      });
    }
  }, [userInfo]);

  const onClickHireRequest = (notif: TNotification) => {
    confirm({
      title: "Ready to accept the hire ?",
      okText: "Accept",
      cancelText: "Deny",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return new Promise((resolve, reject) => {}).catch(() => {});
      },
      onCancel() {
        return new Promise((resolve, reject) => {}).catch(() => {});
      },
    });
  };

  const onClick = (event: MouseEvent, notif: TNotification) => {
    event.preventDefault();
    switch (notif?.action) {
      case 1:
        onClickHireRequest(notif);
        break;
      default:
        break;
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
            {items.map((item, pos) => {
              const renderData = getRenderData(item);
              return (
                <a
                  key={pos}
                  className="notifications__item"
                  onClick={(event) => {
                    onClick(event, item);
                  }}
                >
                  <div className="notifications__ava">
                    <img
                      src={renderData?.thumb || DefaultThumbnail}
                      alt=""
                      className="notifications__pic"
                    />
                  </div>
                  <div className="notifications__details">
                    <div className="notifications__line">
                      <div className="notifications__user">
                        {renderData?.title}
                      </div>
                      <div className="notifications__time">
                        <TimeAgo date={renderData?.time || 0} />
                      </div>
                    </div>
                    <div className="notifications__text">
                      {renderData?.content}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Notifications;

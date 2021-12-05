import clsx from "clsx";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  AddOutline,
  NotificationsOutline,
  SearchOutline,
} from "react-ionicons";
import styles from "./index.module.scss";
import Avartar from "./img/avatar.jpeg";
import RechargeModal from "components/RechargeModal";

const TopBar: FC = () => {
  const [visibleNotifications, setVisibleNotifications] =
    useState<boolean>(false);
  const [visibleRechargeModal, setVisibleRechargeModal] =
    useState<boolean>(true);
  const notificaitonsPanelRef = useRef<any>(null);
  const notificaitonsButtonRef = useRef<any>(null);

  // trigger hide notifications
  useEffect(() => {
    const callback = (event: any) => {
      if (
        !notificaitonsPanelRef.current.contains(event.target) &&
        !notificaitonsButtonRef.current.contains(event.target)
      ) {
        setVisibleNotifications(false);
      }
    };

    document.addEventListener("mousedown", callback);

    return () => {
      document.removeEventListener("mousedown", callback);
    };
  }, []);

  const onNotificationsClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setVisibleNotifications(!visibleNotifications);
  };

  const onRecharge = () => {
    setVisibleRechargeModal(true);
  };

  const onCancelRecharge = () => {
    setVisibleRechargeModal(false);
  };

  return (
    <div className={styles.header}>
      <form className={styles.search}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search nick_name,game..."
        />
        <button className={styles.btnSearch}>
          <SearchOutline />
        </button>
      </form>
      <div className={styles.control}>
        <div className={clsx(styles.item, styles.controlItem)}>
          <button
            type={"button"}
            className={clsx(styles.head, styles.notificationsHead)}
            onClick={onNotificationsClick}
            ref={notificaitonsButtonRef}
          >
            <span className={styles.iconWrap}>
              <NotificationsOutline color={"inherit"} />
            </span>
            <div className={styles.counter}>1</div>
          </button>
          <div
            ref={notificaitonsPanelRef}
            className={clsx(
              styles.body,
              styles.notificationsBody,
              visibleNotifications ? styles.visibleBody : undefined
            )}
          >
            <div>
              <div className={clsx(styles.notificationInfo, "h6")}>
                Recent Notification
              </div>
              <div>
                <a className={styles.notificationsItem} href={"#!"}>
                  <div className={styles.notificationsAva}>
                    <img
                      className={styles.notificationsPic}
                      src={Avartar}
                      alt={""}
                    />
                  </div>
                  <div className={styles.notificationsDetails}>
                    <div className={styles.notificationsLine}>
                      <div className={styles.notificationsUser}>
                        Tuong Nguyen
                      </div>
                      <div className={styles.notificationsTime}>8 days ago</div>
                    </div>
                    <div className={styles.notificationsText}>
                      Rejected your duo request
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.headerItem}>
        <a className={styles.moneyHead} onClick={onRecharge}>
          <span className={styles.iconWrap}>
            <AddOutline color={"inherit"} />
          </span>
          $50,00
        </a>
      </div>
      <div className={clsx(styles.headerItem, styles.profile)}>
        <a className={styles.profileHead} href="#">
          <img className={styles.pic} src={Avartar} alt="" />
        </a>
        <div className={clsx(styles.body, styles.profileBody)}>
          <a className={styles.link} href="#">
            <div className={styles.img}>
              <i className="icon icon-person-outline"></i>
            </div>
            Profile
          </a>
          <a className={styles.link} href="setting_user.html">
            <div className={styles.img}>
              <i className="icon icon-settings-outline"></i>
            </div>
            User Setting
          </a>
          <a className={styles.link} href="#">
            <div className={styles.img}>
              <i className="icon icon-log-out-outline"></i>
            </div>
            Log Out
          </a>
        </div>
      </div>

      <RechargeModal
        visible={visibleRechargeModal}
        onCancel={onCancelRecharge}
      />
    </div>
  );
};

export default TopBar;

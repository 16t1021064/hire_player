import clsx from "clsx";
import React, { FC, MouseEvent, useEffect, useRef, useState } from "react";
import {
  AddOutline,
  LogOutOutline,
  NotificationsOutline,
  PersonOutline,
  SearchOutline,
  SettingsOutline,
} from "react-ionicons";
import styles from "./index.module.scss";
import Avartar from "./img/avatar.jpeg";
import RechargeModal from "components/RechargeModal";
import useMediaQuery from "hooks/useMediaQuery";
import { SIDEBAR_QUERY } from "utils/mediaQuery";

interface TopBarProps {
  onOpenSideBar?: () => void;
}

const TopBar: FC<TopBarProps> = ({ onOpenSideBar }) => {
  const [visibleNotifications, setVisibleNotifications] =
    useState<boolean>(false);
  const [visibleProfile, setVisibleProfile] = useState<boolean>(false);
  const [visibleRechargeModal, setVisibleRechargeModal] =
    useState<boolean>(false);
  const notificaitonsPanelRef = useRef<any>(null);
  const profilePanelRef = useRef<any>(null);
  const notificaitonsButtonRef = useRef<any>(null);
  const profileButtonRef = useRef<any>(null);
  const drawerSideBarQuery = useMediaQuery(SIDEBAR_QUERY);
  const [mobileHeaderVisible, setMobileHeaderVisible] =
    useState<boolean>(false);

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

  // trigger hide profile
  useEffect(() => {
    const callback = (event: any) => {
      if (
        !profilePanelRef.current.contains(event.target) &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setVisibleProfile(false);
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

  const onProfileClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setVisibleProfile(!visibleProfile);
  };

  const onRecharge = () => {
    setVisibleRechargeModal(true);
  };

  const onCancelRecharge = () => {
    setVisibleRechargeModal(false);
  };

  const showSearchBar = (e: MouseEvent) => {
    e.preventDefault();
    setMobileHeaderVisible(!mobileHeaderVisible);
  };

  return (
    <div
      className={clsx(
        styles.header,
        drawerSideBarQuery ? styles.headerFluid : undefined
      )}
    >
      <div className={styles.left}>
        <button
          type={"button"}
          className={clsx(
            styles.burger,
            drawerSideBarQuery ? styles.burgerShow : undefined
          )}
          onClick={() => {
            if (onOpenSideBar) {
              onOpenSideBar();
            }
          }}
        ></button>
        <form
          className={clsx(
            styles.search,
            mobileHeaderVisible ? styles.showSearchMobile : undefined
          )}
        >
          <input
            className={styles.input}
            type="text"
            placeholder="Search nick_name,game..."
          />
          <button className={styles.btnSearch}>
            <SearchOutline />
          </button>
        </form>
      </div>
      <div className={styles.right}>
        <a className={clsx(styles.toggleSearch)} onClick={showSearchBar}>
          <SearchOutline />
        </a>
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
                        <div className={styles.notificationsTime}>
                          8 days ago
                        </div>
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
          <a
            ref={profileButtonRef}
            className={styles.profileHead}
            onClick={onProfileClick}
          >
            <img className={styles.pic} src={Avartar} alt="" />
          </a>
          <div
            ref={profilePanelRef}
            className={clsx(
              styles.body,
              styles.profileBody,
              visibleProfile ? styles.visibleBody : undefined
            )}
          >
            <a className={styles.link} href="#">
              <div className={styles.img}>
                <PersonOutline cssClasses={styles.icon} />
              </div>
              Profile
            </a>
            <a className={styles.link} href="setting_user.html">
              <div className={styles.img}>
                <SettingsOutline cssClasses={styles.icon} />
              </div>
              User Setting
            </a>
            <a className={styles.link} href="#">
              <div className={styles.img}>
                <LogOutOutline cssClasses={styles.icon} />
              </div>
              Log Out
            </a>
          </div>
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

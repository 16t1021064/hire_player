import clsx from "clsx";
import React, { FC, MouseEvent, useEffect, useRef, useState } from "react";
import {
  LogOutOutline,
  PersonOutline,
  SearchOutline,
  SettingsOutline,
} from "react-ionicons";
import styles from "./index.module.scss";
import RechargeModal from "components/RechargeModal";
import useMediaQuery from "hooks/useMediaQuery";
import { SIDEBAR_QUERY } from "utils/mediaQuery";
import { useAppSelector } from "hooks/useRedux";
import { Link } from "react-router-dom";
import { routesEnum } from "pages/Routes";
import Avatar from "components/Avatar";
import { BellOutlined, PlusOutlined } from "@ant-design/icons";
import { settingKeys } from "pages/Settings/SideBar";

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
  const { isLogin } = useAppSelector((state) => state.auth);

  // trigger hide notifications
  useEffect(() => {
    const callback = (event: any) => {
      if (
        notificaitonsPanelRef.current &&
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
        profilePanelRef.current &&
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
        "bg-mode",
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
        {isLogin ? (
          <>
            <div className={styles.control}>
              <div className={clsx(styles.item, styles.controlItem)}>
                <button
                  type={"button"}
                  className={clsx(styles.head, styles.notificationsHead)}
                  onClick={onNotificationsClick}
                  ref={notificaitonsButtonRef}
                >
                  <span className={styles.iconWrap}>
                    <BellOutlined />
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
                          <Avatar size={"md"} hasBorder={false} />
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
                <PlusOutlined /> $50,00
              </a>
            </div>
            <div className={clsx(styles.headerItem, styles.profile)}>
              <a
                ref={profileButtonRef}
                className={styles.profileHead}
                onClick={onProfileClick}
              >
                <Avatar size={"md"} hasBorder={false} />
              </a>
              <div
                ref={profilePanelRef}
                className={clsx(
                  styles.body,
                  styles.profileBody,
                  visibleProfile ? styles.visibleBody : undefined
                )}
              >
                <Link
                  className={styles.link}
                  to={{
                    pathname: routesEnum.settings,
                    state: {
                      settingKey: settingKeys.user.info,
                    },
                  }}
                >
                  <div className={styles.img}>
                    <PersonOutline cssClasses={styles.icon} />
                  </div>
                  Profile
                </Link>
                <Link
                  className={styles.link}
                  to={{
                    pathname: routesEnum.settings,
                    state: {
                      settingKey: settingKeys.security.password,
                    },
                  }}
                >
                  <div className={styles.img}>
                    <SettingsOutline cssClasses={styles.icon} />
                  </div>
                  Change Password
                </Link>
                <Link className={styles.link} to={routesEnum.logout}>
                  <div className={styles.img}>
                    <LogOutOutline cssClasses={styles.icon} />
                  </div>
                  Log Out
                </Link>
              </div>
            </div>
          </>
        ) : undefined}
      </div>

      <RechargeModal
        visible={visibleRechargeModal}
        onCancel={onCancelRecharge}
      />
    </div>
  );
};

export default TopBar;

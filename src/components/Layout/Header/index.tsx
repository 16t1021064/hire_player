import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import Notifications from "./Notifications";
import Profile from "./Profile";
import { useAppSelector } from "hooks/useRedux";
import { Socket } from "socket.io-client";
import clsx from "clsx";
import { formatMoney } from "utils/format";
import styles from "./index.module.less";
import RechargeModal from "components/RechargeModal";

interface HeaderProps {
  socketInstance: Socket | undefined;
  socketConnected: boolean;
  visibleSidebar: boolean;
  onChangeVisibleSidebar: (value: boolean) => void;
}

const Header: FC<HeaderProps> = ({
  socketInstance,
  socketConnected,
  visibleSidebar,
  onChangeVisibleSidebar,
}) => {
  const { userInfo, isLogin } = useAppSelector((state) => state.auth);
  const searchFormRef = useRef<HTMLFormElement | null>(null);
  const searchToggleRef = useRef<HTMLAnchorElement | null>(null);
  const [visibleRecharge, setVisibleRecharge] = useState<boolean>(false);

  const openSearch = () => {
    // eslint-disable-next-line no-undef
    $(".header__search").slideToggle();
  };

  const onRecharge = (event: MouseEvent) => {
    event.preventDefault();
    setVisibleRecharge(true);
  };

  const onCloseRecharge = () => {
    setVisibleRecharge(false);
  };

  useEffect(() => {
    const callback = (event: any) => {
      if (
        searchFormRef.current &&
        searchToggleRef.current &&
        !searchFormRef.current.contains(event.target) &&
        !searchToggleRef.current.contains(event.target)
      ) {
        // eslint-disable-next-line no-undef
        $(".header__search").slideUp();
      }
    };

    document.addEventListener("mousedown", callback);

    return () => {
      document.removeEventListener("mousedown", callback);
    };
  }, []);

  return (
    <>
      <div className="header">
        <button
          className={clsx("header__burger", visibleSidebar && "active")}
          onClick={() => {
            onChangeVisibleSidebar(!visibleSidebar);
          }}
        ></button>
        <form action="" className="header__search" ref={searchFormRef}>
          <input
            type="text"
            className="header__input"
            placeholder="Search nick_name,game..."
          />
          <button className="header__btn-search">
            <IonIcon
              className="icon icon-search-outline"
              name="search-outline"
            />
          </button>
        </form>
        {isLogin ? (
          <>
            <div className="header__control">
              <a
                className="header__item header__item_search"
                onClick={openSearch}
                ref={searchToggleRef}
              >
                <IonIcon
                  className="icon icon-search-outline"
                  name="search-outline"
                />
              </a>
              <Notifications
                socketInstance={socketInstance}
                socketConnected={socketConnected}
              />
            </div>
            <div className="header__item header__item__money">
              <a
                className={clsx(
                  "header__head js-propagation",
                  styles.walletValue
                )}
                onClick={onRecharge}
              >
                <IonIcon className="icon icon-add-outline" name="add-outline" />
                {formatMoney(userInfo?.money || 0)}
              </a>
            </div>
            <Profile />
          </>
        ) : (
          <></>
        )}
      </div>
      <RechargeModal visible={visibleRecharge} onClose={onCloseRecharge} />
    </>
  );
};

export default Header;

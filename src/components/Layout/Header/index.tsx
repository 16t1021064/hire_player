import { FC, MouseEvent, useRef } from "react";
import IonIcon from "@reacticons/ionicons";
import { openPopup } from "utils/magnific";
import Notifications from "./Notifications";
import Profile from "./Profile";
import { useAppSelector } from "hooks/useRedux";
import { Socket } from "socket.io-client";
import clsx from "clsx";

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
  const modalRechargeRef = useRef<HTMLDivElement | null>(null);
  const { userInfo, isLogin } = useAppSelector((state) => state.auth);

  const openSearch = () => {
    // eslint-disable-next-line no-undef
    $(".header__search").slideToggle();
  };

  const onRecharge = (event: MouseEvent) => {
    event.preventDefault();
    openPopup(modalRechargeRef.current);
  };

  return (
    <>
      <div className="header">
        <button
          className={clsx("header__burger", visibleSidebar && "active")}
          onClick={() => {
            onChangeVisibleSidebar(!visibleSidebar);
          }}
        ></button>
        <form action="" className="header__search">
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
                href=""
                className="header__head js-propagation"
                onClick={onRecharge}
              >
                <IonIcon className="icon icon-add-outline" name="add-outline" />
                ${(userInfo?.money || 0).toFixed(2)}
              </a>
            </div>
            <Profile />
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="popup popup_normal mfp-hide" ref={modalRechargeRef}>
        <form className="popup__form">
          <div className="popup__title h5">Recharge</div>
          <div className="popup__fieldset">
            <div className="popup__field field">
              <div className="field__label">Withdraw Method</div>
              <div className="field__wrap">
                <select className="field__select">
                  <option>PayPal</option>
                  <option>Bank</option>
                </select>
              </div>
            </div>
          </div>
          <div className="popup__fieldset">
            <div className="popup__row">
              <div className="popup__field field">
                <div className="field__label">Amount</div>
                <div className="field__wrap">
                  <input className="field__input" type="number" />
                </div>
              </div>
              <div className="popup__field field">
                <div className="field__label">PayPal Email</div>
                <div className="field__wrap">
                  <input className="field__input" type="email" />
                </div>
              </div>
            </div>
          </div>
          <button className="popup__btn btn btn_primary" type="submit">
            Recharge now
          </button>
        </form>
      </div>
    </>
  );
};

export default Header;

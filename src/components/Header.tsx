import { FC, MouseEvent, useEffect, useRef } from "react";
import IonIcon from "@reacticons/ionicons";
import AvaTuong from "img/ava-tuong.jpeg";
import { Link } from "react-router-dom";
import { routesEnum } from "pages/Routes";
import { openPopup } from "utils/magnific";
import useSocket from "hooks/useSocket";
import { SocketEvents, SocketListeners } from "socket";
import { useAppSelector } from "hooks/useRedux";
import {
  TEventData_StartOnline,
  TListenerData_OnNotifications,
  TListenerData_OnStartOnline,
} from "socket/types";

const Header: FC = () => {
  const modalRechargeRef = useRef<HTMLDivElement | null>(null);
  const handleOnNotifsRef = useRef<
    ((data: TListenerData_OnNotifications) => void) | null
  >(null);
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const { socket, connected } = useSocket();

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

  const onRecharge = (event: MouseEvent) => {
    event.preventDefault();
    openPopup(modalRechargeRef.current);
  };

  return (
    <>
      <div className="header">
        <button className="header__burger"></button>
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
        <div className="header__control">
          <a className="header__item header__item_search">
            <IonIcon
              className="icon icon-search-outline"
              name="search-outline"
            />
          </a>
          <div className="header__item header__item_notifications js-header-item">
            <button className="header__head js-header-head">
              <IonIcon
                className="icon icon-notifications-outline"
                name="notifications-outline"
              />
              <div className="header__counter">2</div>
            </button>
            <div className="header__body js-header-body">
              <div className="notifications">
                <div className="notifications__info h6">
                  Recent Notification
                </div>
                <div className="notifications__list">
                  <a className="notifications__item">
                    <div className="notifications__ava">
                      <img
                        src={AvaTuong}
                        alt=""
                        className="notifications__pic"
                      />
                    </div>
                    <div className="notifications__details">
                      <div className="notifications__line">
                        <div className="notifications__user">Tuong Nguyen</div>
                        <div className="notifications__time">8 days ago</div>
                      </div>
                      <div className="notifications__text">
                        Rejected your Hire request
                      </div>
                    </div>
                  </a>
                  <a className="notifications__item">
                    <div className="notifications__ava">
                      <img
                        src={AvaTuong}
                        alt=""
                        className="notifications__pic"
                      />
                    </div>
                    <div className="notifications__details">
                      <div className="notifications__line">
                        <div className="notifications__user">Tuong Nguyen</div>
                        <div className="notifications__time">8 days ago</div>
                      </div>
                      <div className="notifications__text">
                        has accepted your Hire request
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header__item header__item__money">
          <a
            href=""
            className="header__head js-propagation"
            onClick={onRecharge}
          >
            <IonIcon className="icon icon-add-outline" name="add-outline" />
            $50,00
          </a>
        </div>
        <div className="header__item header__item_profile">
          <a className="header__head">
            <img src={AvaTuong} alt="" className="header__pic" />
          </a>
          <div className="header__body">
            <Link to={routesEnum.settingUserPassword} className="header__link">
              <div className="header__img">
                <IonIcon
                  className="icon icon-person-outline"
                  name="person-outline"
                />
              </div>
              Profile
            </Link>
            <Link to={routesEnum.settingUserPassword} className="header__link">
              <div className="header__img">
                <IonIcon
                  className="icon icon-settings-outline"
                  name="settings-outline"
                />
              </div>
              Change password
            </Link>
            <Link to={routesEnum.logout} className="header__link">
              <div className="header__img">
                <IonIcon
                  className="icon icon-log-out-outline"
                  name="log-out-outline"
                />
              </div>
              Log Out
            </Link>
          </div>
        </div>
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

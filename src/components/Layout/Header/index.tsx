import { FC, MouseEvent, useEffect, useRef } from "react";
import IonIcon from "@reacticons/ionicons";
import { openPopup } from "utils/magnific";
import Notifications from "./Notifications";
import Profile from "./Profile";
import { useAppSelector } from "hooks/useRedux";
import { Socket } from "socket.io-client";

interface HeaderProps {
  socketInstance: Socket | undefined;
  socketConnected: boolean;
}

const Header: FC<HeaderProps> = ({ socketInstance, socketConnected }) => {
  const modalRechargeRef = useRef<HTMLDivElement | null>(null);
  const { userInfo, isLogin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // page
    (function () {
      // eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
      const page = $(".page");
      // eslint-disable-next-line no-undef
      const sidebar = $(".sidebar");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const burger = sidebar.find(".sidebar__burger");
      const close = sidebar.find(".sidebar__close");
      // eslint-disable-next-line no-undef
      const header = $(".header");
      const burgerHeader = header.find(".header__burger");
      const search = header.find(".header__search");
      const openSearch = header.find(".header__item_search");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let items = header.find(".header__item");

      openSearch.on("click", function (e) {
        e.preventDefault();
        burgerHeader.removeClass("active");
        search.slideToggle();
        sidebar.removeClass("visible");
        // eslint-disable-next-line no-undef
        $("html").removeClass("no-scroll");
        // eslint-disable-next-line no-undef
        $("body").removeClass("no-scroll");
      });
      burgerHeader.on("click", function () {
        burgerHeader.toggleClass("active");
        search.slideUp();
        sidebar.toggleClass("visible");
        // eslint-disable-next-line no-undef
        $("html").toggleClass("no-scroll");
        // eslint-disable-next-line no-undef
        $("body").toggleClass("no-scroll");
      });
      close.on("click", function () {
        burgerHeader.removeClass("active");
        search.slideUp();
        sidebar.removeClass("visible");
        // eslint-disable-next-line no-undef
        $("html").removeClass("no-scroll");
        // eslint-disable-next-line no-undef
        $("body").removeClass("no-scroll");
      });
    })();
  });

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
        {isLogin ? (
          <>
            <div className="header__control">
              <a className="header__item header__item_search">
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

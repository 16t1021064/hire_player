import { FC, useRef } from "react";
import IonIcon from "@reacticons/ionicons";
import AvaTuong from "img/ava-tuong.jpeg";

const Header: FC = () => {
  const rechargeLink = useRef<any>(null);
  const showRecharge = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="header">
      <button className="header__burger"></button>
      <form action="" className="header__search">
        <input
          type="text"
          className="header__input"
          placeholder="Search nick_name,game..."
        />
        <button className="header__btn-search">
          <IonIcon className="icon icon-search-outline" name="search-outline" />
        </button>
      </form>
      <div className="header__control">
        <a href="" className="header__item header__item_search">
          <IonIcon className="icon icon-search-outline" name="search-outline" />
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
              <div className="notifications__info h6">Recent Notification</div>
              <div className="notifications__list">
                <a href="" className="notifications__item">
                  <div className="notifications__ava">
                    <img src={AvaTuong} alt="" className="notifications__pic" />
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
                <a href="" className="notifications__item">
                  <div className="notifications__ava">
                    <img src={AvaTuong} alt="" className="notifications__pic" />
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
          href="#popup-recharge"
          data-effect="mfp-zoom-in"
          className="header__head js-popup-open"
          onClick={showRecharge}
          ref={rechargeLink}
        >
          <IonIcon className="icon icon-add-outline" name="add-outline" />
          $50,00
        </a>
      </div>
      <div className="header__item header__item_profile">
        <a href="" className="header__head">
          <img src={AvaTuong} alt="" className="header__pic" />
        </a>
        <div className="header__body">
          <a href="" className="header__link">
            <div className="header__img">
              <IonIcon
                className="icon icon-person-outline"
                name="person-outline"
              />
            </div>
            Profile
          </a>
          <a href="" className="header__link">
            <div className="header__img">
              <IonIcon
                className="icon icon-settings-outline"
                name="settings-outline"
              />
            </div>
            Change password
          </a>
          <a href="" className="header__link">
            <div className="header__img">
              <IonIcon
                className="icon icon-log-out-outline"
                name="log-out-outline"
              />
            </div>
            Log Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;

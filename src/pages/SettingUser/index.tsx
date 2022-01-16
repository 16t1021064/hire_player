import { FC } from "react";
import IonIcon from "@reacticons/ionicons";
import SidebarSettings from "components/Layout/SidebarSettings";
import AvaTuongImage from "img/ava-tuong.jpeg";

const SettingUser: FC = () => {
  return (
    <>
      <div className="setting__menu__mobile">
        <span className="setting__menu__outline">
          <IonIcon className="icon icon-menu-outline" name="menu-outline" />
        </span>
        <span className="setting__menu__close">
          <IonIcon className="icon icon-close-outline" name="close-outline" />
        </span>
      </div>
      <div className="setting__body">
        <div className="setting__sidebar">
          <SidebarSettings />
        </div>
        <div className="setting__content">
          <form className="setting__form">
            <div className="setting__title h5">User Info</div>
            <div className="setting__user">
              <div className="setting__category caption-sm">Your Avatar</div>
              <div className="setting__line">
                <div className="setting__ava">
                  <img className="setting__pic" src={AvaTuongImage} alt="" />
                </div>
                <div className="setting__details">
                  <div className="setting__btns">
                    <div className="setting__loading">
                      <input className="setting__file" type="file" />
                      <button className="setting__btn btn btn_gray btn__small">
                        Change
                      </button>
                    </div>
                  </div>
                  <div className="setting__text">JPG, GIF OR PNG, 5 MB</div>
                </div>
              </div>
            </div>
            <div className="setting__fieldset">
              <div className="setting__row">
                <div className="setting__field field">
                  <div className="field__label">Full Name</div>
                  <div className="field__wrap">
                    <input className="field__input" type="text" />
                  </div>
                </div>
              </div>
              <div className="setting__field field">
                <div className="field__label">Gender</div>
                <div className="field__wrap">
                  <select className="field__select">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="popup__btn btn btn_primary" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingUser;

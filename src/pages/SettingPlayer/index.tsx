import { FC } from "react";
import IonIcon from "@reacticons/ionicons";
import SidebarSettings from "components/Layout/SidebarSettings";

const SettingPlayer: FC = () => {
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
            <div className="setting__title h5">Player Info</div>
            <div className="setting__fieldset">
              <div className="setting__row">
                <div className="setting__field field">
                  <div className="field__label">PLAYER NAME:</div>
                  <div className="field__wrap">
                    <input className="field__input" type="text" />
                  </div>
                </div>
                <div className="setting__field field">
                  <div className="field__label">GAME NAME:</div>
                  <div className="field__wrap">
                    <input className="field__input" type="text" />
                  </div>
                </div>
              </div>
              <div className="setting__row">
                <div className="setting__field field">
                  <div className="field__label">TITLE OR RANK:</div>
                  <div className="field__wrap">
                    <input className="field__input" type="text" />
                  </div>
                </div>
                <div className="setting__field field">
                  <div className="field__label">COST PER HOUR:</div>
                  <div className="field__wrap">
                    <input className="field__input" type="text" />
                  </div>
                </div>
              </div>
              <div className="setting__field field">
                <div className="field__label">FULL DETAIL OF YOU:</div>
                <div className="field__wrap">
                  <textarea className="field__textarea"></textarea>
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

export default SettingPlayer;

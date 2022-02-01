import { FC } from "react";
import AvaTuongImage from "img/ava-tuong.jpeg";
import SettingsLayout from "components/Layout/SettingsLayout";
import Button from "components/Button";

const User: FC = () => {
  return (
    <SettingsLayout>
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
                  <Button type="gray" className="setting__btn" size="small">
                    Change
                  </Button>
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
        <Button type="primary" htmlType="submit" className="popup__btn">
          Update
        </Button>
      </form>
    </SettingsLayout>
  );
};

export default User;

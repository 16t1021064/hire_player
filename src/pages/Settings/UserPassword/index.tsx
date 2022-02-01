import { FC } from "react";
import SettingsLayout from "components/Layout/SettingsLayout";
import Button from "components/Button";

const UserPassword: FC = () => {
  return (
    <SettingsLayout>
      <form action="" className="setting__form">
        <div className="setting__title h5">Change Password</div>
        <div className="setting__fieldset">
          <div className="setting__field field">
            <div className="field__label">Old Password</div>
            <div className="field__wrap">
              <input type="password" className="field__input" />
            </div>
          </div>
          <div className="setting__field field">
            <div className="field__label">New Password</div>
            <div className="field__wrap">
              <input type="password" className="field__input" />
            </div>
          </div>
          <div className="setting__field field">
            <div className="field__label">Confirm Password</div>
            <div className="field__wrap">
              <input type="password" className="field__input" />
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

export default UserPassword;

import { FC } from "react";
import SettingsLayout from "components/Layout/SettingsLayout";
import Button from "components/Button";

const Payments: FC = () => {
  return (
    <SettingsLayout>
      <form className="setting__form">
        <div className="setting__title h5">Setting Payments</div>
        <div className="setting__fieldset">
          <div className="setting__row">
            <div className="setting__field field">
              <div className="field__label">PayPal Address</div>
              <div className="field__wrap">
                <input className="field__input" type="email" />
              </div>
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

export default Payments;

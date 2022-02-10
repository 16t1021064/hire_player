import { FC, useEffect } from "react";
import SettingsLayout from "components/Layout/SettingsLayout";
import Button from "components/Button";
import { loadStripe } from "@stripe/stripe-js";

const Payments: FC = () => {
  useEffect(() => {
    (async () => {
      const stripe = await loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
      stripe?.confirmCardPayment("a", {});
      console.log(stripe);
    })();
  }, []);
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

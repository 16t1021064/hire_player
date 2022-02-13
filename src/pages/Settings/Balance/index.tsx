import { FC, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import SettingsLayout from "components/Layout/SettingsLayout";
import { useAppSelector } from "hooks/useRedux";
import { formatMoney } from "utils/format";
import Button from "components/Button";
import RechargeModal from "components/RechargeModal";

const Balance: FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [visibleRecharge, setVisibleRecharge] = useState<boolean>(false);

  const onRecharge = () => {
    setVisibleRecharge(true);
  };

  const onCloseRecharge = () => {
    setVisibleRecharge(false);
  };

  return (
    <>
      <SettingsLayout>
        <div className="setting__title h5">Current balance</div>
        <div className="setting__balance">
          <div className="h2 text__blue">
            {formatMoney(userInfo?.money || 0)}
          </div>
          <Button type="primary" size="xs__small" onClick={onRecharge}>
            <IonIcon className="icon icon-add-outline" name="add-outline" />
            Recharge
          </Button>
        </div>
        <form className="setting__form">
          <div className="setting__fieldset">
            <div className="setting__field field">
              <div className="field__label">Withdraw Method</div>
              <div className="field__wrap">
                <select className="field__select">
                  <option>PayPal</option>
                  <option>Bank</option>
                </select>
              </div>
            </div>
            <div className="setting__row">
              <div className="setting__field field">
                <div className="field__label">PayPal Email</div>
                <div className="field__wrap">
                  <input className="field__input" type="email" />
                </div>
              </div>
              <div className="setting__field field">
                <div className="field__label">Amount</div>
                <div className="field__wrap">
                  <input className="field__input" type="number" />
                </div>
              </div>
            </div>
          </div>
          <Button className="popup__btn" type="gray" htmlType="submit">
            Request withdraw
          </Button>
        </form>
        <div className="settings_row mt-5">
          <div className="setting__title h5">Withdraw History</div>
          <div className="table-reponsive">
            <table className="table-latitude">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>TIME WITHDRAW</th>
                  <th>METHOD</th>
                  <th>Status</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>$20</td>
                  <td>19/11/2021</td>
                  <td>PayPal | abc@gmail.com</td>
                  <td>
                    <span className="text__green text__bold">Completed</span>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>$20</td>
                  <td>19/11/2021</td>
                  <td>PayPal | abc@gmail.com</td>
                  <td>
                    <span className="text__red text__bold">Canceled </span>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </SettingsLayout>
      <RechargeModal visible={visibleRecharge} onClose={onCloseRecharge} />
    </>
  );
};

export default Balance;

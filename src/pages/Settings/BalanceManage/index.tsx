import { FC } from "react";
import SettingsLayout from "components/Layout/SettingsLayout";

const BalanceManage: FC = () => {
  return (
    <SettingsLayout>
      <div className="setting__title h5">Balance fluctuations</div>
      <div className="settings_row">
        <div className="table-reponsive">
          <table className="table-latitude">
            <thead>
              <tr>
                <th>TIME</th>
                <th>MONEY</th>
                <th>MESSAGE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>19/11/2021 04:22:26</td>
                <td>+ $50,00</td>
                <td>
                  <span>Cancel Duo</span>
                </td>
              </tr>
              <tr>
                <td>19/10/2021 04:22:26</td>
                <td>- $25,00</td>
                <td>
                  <span>Rent player</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default BalanceManage;

import { FC } from "react";
import IonIcon from "@reacticons/ionicons";
import SidebarSettings from "components/Layout/SidebarSettings";

const SettingPlayerDonateHistory: FC = () => {
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
          <div className="setting__title h5">Received Donate</div>
          <div className="settings_row">
            <div className="table-reponsive">
              <table className="table-latitude">
                <thead>
                  <th>DONATE CODE</th>
                  <th>TIME</th>
                  <th>FROM USER</th>
                  <th>AMOUNT</th>
                  <th>MESSAGE</th>
                </thead>
                <tbody>
                  <tr>
                    <td>125e5448f0e01e</td>
                    <td>19/11/2021</td>
                    <td>Phan Vien</td>
                    <td>$50</td>
                    <td>Nice Player</td>
                  </tr>
                  <tr>
                    <td>125e5448f0e01e</td>
                    <td>19/11/2021</td>
                    <td>Phan Vien</td>
                    <td>$50</td>
                    <td>Nice Player</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPlayerDonateHistory;

import { FC } from "react";
import IonIcon from "@reacticons/ionicons";
import SidebarSettings from "components/SidebarSettings";

const SettingPlayerHireHistory: FC = () => {
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
          <div className="setting__title h5">Received Hire</div>
          <div className="settings_row">
            <div className="table-reponsive">
              <table className="table-latitude">
                <thead>
                  <th>HIRE CODE</th>
                  <th>CREATED AT</th>
                  <th>USER</th>
                  <th>STATUS</th>
                </thead>
                <tbody>
                  <tr>
                    <td>125e5448f0e01e</td>
                    <td>19/11/2021</td>
                    <td>Phan Vien</td>
                    <td>
                      <span className="text__red text__bold">Cancelled</span>
                    </td>
                  </tr>
                  <tr>
                    <td>125e5448f0e01e</td>
                    <td>19/11/2021</td>
                    <td>Phan Vien</td>
                    <td>
                      <span className="text__green text__bold">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>125e5448f0e01e</td>
                    <td>19/11/2021</td>
                    <td>Phan Vien</td>
                    <td>
                      <span className="text__green text__bold">Completed</span>
                    </td>
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

export default SettingPlayerHireHistory;

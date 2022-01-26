import { FC } from "react";
import SettingsLayout from "components/Layout/SettingsLayout";

const PlayerHires: FC = () => {
  return (
    <SettingsLayout>
      <div className="setting__title h5">Received Hire</div>
      <div className="settings_row">
        <div className="table-reponsive">
          <table className="table-latitude">
            <thead>
              <tr>
                <th>HIRE CODE</th>
                <th>CREATED AT</th>
                <th>USER</th>
                <th>STATUS</th>
              </tr>
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
    </SettingsLayout>
  );
};

export default PlayerHires;

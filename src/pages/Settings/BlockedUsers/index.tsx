import { FC } from "react";
import IonIcon from "@reacticons/ionicons";
import SettingsLayout from "components/Layout/SettingsLayout";
import Button from "components/Button";

const BlockedUsers: FC = () => {
  return (
    <SettingsLayout>
      <div className="setting__title h5">Block users list</div>
      <div className="settings_row">
        <div className="table-reponsive">
          <table className="table-latitude">
            <thead>
              <tr>
                <th>USER</th>
                <th>TIME BLOCK</th>
                <th>REASON</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Phan Vien</td>
                <td>19/11/2021</td>
                <td>BLOCK USER</td>
                <td>
                  <Button type="gray" size="small" square>
                    <IonIcon
                      className="icon icon-trash-outline"
                      name="trash-outline"
                    />
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Phan Vien</td>
                <td>19/11/2021</td>
                <td>BLOCK USER</td>
                <td>
                  <Button type="gray" size="small" square>
                    <IonIcon
                      className="icon icon-trash-outline"
                      name="trash-outline"
                    />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default BlockedUsers;

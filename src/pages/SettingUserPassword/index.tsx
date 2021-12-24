import Header from "components/Header";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { FC } from "react";
import IonIcon from "@reacticons/ionicons";
import SidebarSettings from "components/SidebarSettings";

const SettingUserPassword: FC = () => {
  return (
    <Layout>
      <div className="page">
        <Sidebar />
        <div className="page__wrapper">
          <Header />
          <div className="setting__menu__mobile">
            <span className="setting__menu__outline">
              <IonIcon className="icon icon-menu-outline" name="menu-outline" />
            </span>
            <span className="setting__menu__close">
              <IonIcon
                className="icon icon-close-outline"
                name="close-outline"
              />
            </span>
          </div>
          <div className="setting__body">
            <div className="setting__sidebar">
              <SidebarSettings />
            </div>
            <div className="setting__content">
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
                <button className="popup__btn btn btn_primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingUserPassword;

import Header from "components/Header";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { FC } from "react";
import IonIcon from "@reacticons/ionicons";
import SidebarSettings from "components/SidebarSettings";
import SettingPlayerAlbumsImage from "img/setting_player_albums.png";

const SettingPlayerAlbums: FC = () => {
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
              <form className="setting__form">
                <div className="setting__title h5">Albums Player</div>
                <div className="setting__btns">
                  <div className="setting__loading">
                    <input className="setting__file" type="file" />
                    <button className="btn btn_blue btn__small">
                      Upload images
                    </button>
                  </div>
                </div>
                <p></p>
                <strong>Use: React grid photos:</strong>
                <a href="https://github.com/benhowell/react-grid-gallery">
                  https://github.com/benhowell/react-grid-gallery
                </a>
                <img src={SettingPlayerAlbumsImage} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingPlayerAlbums;

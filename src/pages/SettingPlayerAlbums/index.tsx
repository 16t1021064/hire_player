import { FC } from "react";
import IonIcon from "@reacticons/ionicons";
import SidebarSettings from "components/Layout/SidebarSettings";
import SettingPlayerAlbumsImage from "img/setting_player_albums.png";
import { useAppSelector } from "hooks/useRedux";
import { useMutation } from "react-query";
import { uploadImagesRequest } from "api/players/request";
import { Upload } from "antd";

const SettingPlayerAlbums: FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const { mutate: uploadImages } = useMutation(uploadImagesRequest);

  const beforeUpload = (file: File, files: File[]) => {
    uploadImages({
      id: userInfo?.id || "",
      images: files,
    });
    return false;
  };

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
          <form className="setting__form">
            <div className="setting__title h5">Albums Player</div>
            <div className="setting__btns">
              <div className="setting__loading">
                <Upload
                  beforeUpload={beforeUpload}
                  accept="image/*"
                  showUploadList={false}
                  maxCount={15}
                  multiple
                >
                  <button type="button" className="btn btn_blue btn__small">
                    Upload images
                  </button>
                </Upload>
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
    </>
  );
};

export default SettingPlayerAlbums;

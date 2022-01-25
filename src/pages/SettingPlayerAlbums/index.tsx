import { FC, useEffect, useRef, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import SidebarSettings from "components/Layout/SidebarSettings";
import SettingPlayerAlbumsImage from "img/setting_player_albums.png";
import { useAppSelector } from "hooks/useRedux";
import { useMutation } from "react-query";
import { uploadImagesRequest } from "api/players/request";
import { Upload } from "antd";

const SettingPlayerAlbums: FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  // const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const uploadFiles = useRef<File[]>([]);
  const countUploadFiles = useRef<number>(0);

  const { mutate: uploadImages } = useMutation(uploadImagesRequest, {
    onSuccess: (data) => {
      console.log("length", data.data.playerInfo?.images?.length);
      countUploadFiles.current = 0;
      uploadFiles.current = [];
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const beforeUpload = (file: File, files: File[]) => {
    console.log("beforeUpload");
    countUploadFiles.current = files.length;
    uploadFiles.current.push(file);
    setTimeout(() => {
      upload();
    });
    // uploadFiles.push(file);
    // setUploadFiles([...uploadFiles, ...files]);
    // setTimeout(() => {
    //   if (uploadFiles.length === files.length) {
    //     uploadImages({
    //       id: userInfo?.id || "",
    //       images: uploadFiles,
    //     });
    //   }
    // });
    return false;
  };

  const upload = () => {
    console.log("upload");
    if (countUploadFiles.current === uploadFiles.current.length) {
      uploadImages({
        id: userInfo?.id || "",
        images: uploadFiles.current,
      });
    }
  };

  useEffect(() => {
    console.log("length", userInfo?.playerInfo?.images?.length);
  }, [userInfo]);

  // useEffect(() => {
  //   // countUploadFiles.current = uploadFiles.length;
  //   console.log(uploadFiles.length);
  // }, [uploadFiles]);

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

import { FC } from "react";
import IonIcon from "@reacticons/ionicons";
import SidebarSettings from "components/Layout/SidebarSettings";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import DefaultAvatar from "assets/images/default-avatar.jpg";
import { Upload } from "antd";
import { uploadAvatarRequest } from "api/players/request";
import { useMutation } from "react-query";
import { setUserInfo } from "store/ducks/auth/slice";

const SettingPlayer: FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { mutate: uploadAvatar, status: uploadAvatarStatus } = useMutation(
    uploadAvatarRequest,
    {
      onSuccess: (data) => {
        dispatch(setUserInfo(data.data));
      },
    }
  );

  const beforeUpload = (file: File) => {
    uploadAvatar({
      id: userInfo?.id || "",
      images: [file],
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
            <div className="setting__title h5">Player Info</div>
            <div className="setting__user">
              <div className="setting__category caption-sm">Your Avatar</div>
              <div className="setting__line">
                <div className="setting__ava">
                  <img
                    className="setting__pic"
                    src={
                      userInfo?.playerInfo?.playerAvatar?.link || DefaultAvatar
                    }
                    alt=""
                  />
                </div>
                <div className="setting__details">
                  <div className="setting__btns">
                    <div className="setting__loading">
                      <Upload
                        beforeUpload={beforeUpload}
                        accept="image/*"
                        showUploadList={false}
                        maxCount={1}
                        disabled={uploadAvatarStatus === "loading"}
                      >
                        <button
                          type="button"
                          className="setting__btn btn btn_gray btn__small"
                        >
                          Change
                        </button>
                      </Upload>
                    </div>
                  </div>
                  <div className="setting__text">JPG, GIF OR PNG, 5 MB</div>
                </div>
              </div>
            </div>
            <div className="setting__fieldset">
              <div className="setting__row">
                <div className="setting__field field">
                  <div className="field__label">PLAYER NAME:</div>
                  <div className="field__wrap">
                    <input className="field__input" type="text" />
                  </div>
                </div>
                <div className="setting__field field">
                  <div className="field__label">GAME NAME:</div>
                  <div className="field__wrap">
                    <input className="field__input" type="text" />
                  </div>
                </div>
              </div>
              <div className="setting__row">
                <div className="setting__field field">
                  <div className="field__label">TITLE OR RANK:</div>
                  <div className="field__wrap">
                    <input className="field__input" type="text" />
                  </div>
                </div>
                <div className="setting__field field">
                  <div className="field__label">COST PER HOUR:</div>
                  <div className="field__wrap">
                    <input className="field__input" type="text" />
                  </div>
                </div>
              </div>
              <div className="setting__field field">
                <div className="field__label">FULL DETAIL OF YOU:</div>
                <div className="field__wrap">
                  <textarea className="field__textarea"></textarea>
                </div>
              </div>
            </div>
            <button className="popup__btn btn btn_primary" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingPlayer;

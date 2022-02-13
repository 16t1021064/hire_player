import { FC, SyntheticEvent, useEffect, useRef } from "react";
import SettingsLayout from "components/Layout/SettingsLayout";
import Button from "components/Button";
import { Upload } from "antd";
import { useMutation } from "react-query";
import { updateInfoRequest, uploadAvatarRequest } from "api/users/requests";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { setUserInfo } from "store/ducks/auth/slice";
import DefaultAvatar from "assets/images/default-avatar.jpg";
import { TGenders } from "types";
import { notifySuccess } from "utils/notify";

const User: FC = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const fullnameRef = useRef<HTMLInputElement | null>(null);
  const genderRef = useRef<HTMLSelectElement | null>(null);
  const lockInitial = useRef<boolean>(false);

  const { mutate: uploadAvatar, status: uploadAvatarStatus } = useMutation(
    uploadAvatarRequest,
    {
      onSuccess: (data) => {
        dispatch(setUserInfo(data.data));
        notifySuccess("Avatar has been updated successfully");
      },
    }
  );

  const beforeUpload = (file: File) => {
    uploadAvatar({
      id: userInfo?.id || "",
      avatar: file,
    });
    return false;
  };

  const { mutate: updateInfo, status: updateInfoStatus } = useMutation(
    updateInfoRequest,
    {
      onSuccess: (data) => {
        dispatch(setUserInfo(data.data));
        notifySuccess("Information has been updated successfully");
      },
    }
  );

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      userInfo &&
      updateInfoStatus !== "loading" &&
      fullnameRef.current?.value &&
      genderRef.current?.value
    ) {
      updateInfo({
        fullName: fullnameRef.current.value,
        gender: parseInt(genderRef.current.value) as TGenders,
      });
    }
  };

  useEffect(() => {
    if (
      userInfo &&
      !lockInitial.current &&
      fullnameRef.current &&
      genderRef.current
    ) {
      fullnameRef.current.value = "" + userInfo.fullName;
      genderRef.current.value = "" + userInfo.gender;
      lockInitial.current = true;
    }
  }, [userInfo]);

  return (
    <SettingsLayout>
      <form className="setting__form" onSubmit={onSubmit}>
        <div className="setting__title h5">User Info</div>
        <div className="setting__user">
          <div className="setting__category caption-sm">Your Avatar</div>
          <div className="setting__line">
            <div className="setting__ava">
              <img
                className="setting__pic"
                src={userInfo?.avatar?.link || DefaultAvatar}
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
                    <Button type="gray" className="setting__btn" size="small">
                      Change
                    </Button>
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
              <div className="field__label">Full Name</div>
              <div className="field__wrap">
                <input className="field__input" type="text" ref={fullnameRef} />
              </div>
            </div>
          </div>
          <div className="setting__field field">
            <div className="field__label">Gender</div>
            <div className="field__wrap">
              <select className="field__select" ref={genderRef}>
                <option value={1}>Male</option>
                <option value={2}>Female</option>
              </select>
            </div>
          </div>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className="popup__btn"
          loading={
            uploadAvatarStatus === "loading" || updateInfoStatus === "loading"
          }
        >
          Update
        </Button>
      </form>
    </SettingsLayout>
  );
};

export default User;

import { FC, SyntheticEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import DefaultAvatar from "assets/images/default-avatar.jpg";
import { Upload } from "antd";
import { updateInfoRequest, uploadAvatarRequest } from "api/players/request";
import { useMutation } from "react-query";
import { setUserInfo } from "store/ducks/auth/slice";
import SettingsLayout from "components/Layout/SettingsLayout";
import Button from "components/Button";
import { notifySuccess } from "utils/notify";

const Player: FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const gamesRef = useRef<HTMLInputElement>(null);
  const rankRef = useRef<HTMLInputElement>(null);
  const hourPriceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

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
      nameRef.current?.value &&
      gamesRef.current?.value &&
      rankRef.current?.value &&
      hourPriceRef.current?.value &&
      descriptionRef.current?.value
    ) {
      updateInfo({
        id: userInfo.id,
        playerName: nameRef.current.value,
        gameName: gamesRef.current.value,
        rank: rankRef.current.value,
        costPerHour: parseFloat(hourPriceRef.current.value),
        description: descriptionRef.current.value,
      });
    }
  };

  return (
    <SettingsLayout>
      <form className="setting__form" onSubmit={onSubmit}>
        <div className="setting__title h5">Player Info</div>
        <div className="setting__user">
          <div className="setting__category caption-sm">Your Avatar</div>
          <div className="setting__line">
            <div className="setting__ava">
              <img
                className="setting__pic"
                src={userInfo?.playerInfo?.playerAvatar?.link || DefaultAvatar}
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
                    <Button type="gray" size="small" className="setting__btn">
                      Update
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
              <div className="field__label">PLAYER NAME:</div>
              <div className="field__wrap">
                <input
                  className="field__input"
                  type="text"
                  ref={nameRef}
                  defaultValue={userInfo?.playerInfo?.playerName}
                />
              </div>
            </div>
            <div className="setting__field field">
              <div className="field__label">GAME NAME:</div>
              <div className="field__wrap">
                <input
                  className="field__input"
                  type="text"
                  ref={gamesRef}
                  defaultValue={userInfo?.playerInfo?.gameName}
                />
              </div>
            </div>
          </div>
          <div className="setting__row">
            <div className="setting__field field">
              <div className="field__label">TITLE OR RANK:</div>
              <div className="field__wrap">
                <input
                  className="field__input"
                  type="text"
                  ref={rankRef}
                  defaultValue={userInfo?.playerInfo?.rank}
                />
              </div>
            </div>
            <div className="setting__field field">
              <div className="field__label">COST PER HOUR:</div>
              <div className="field__wrap">
                <input
                  className="field__input"
                  type="number"
                  step={1}
                  min={0}
                  ref={hourPriceRef}
                  defaultValue={userInfo?.playerInfo?.costPerHour || 0}
                />
              </div>
            </div>
          </div>
          <div className="setting__field field">
            <div className="field__label">FULL DETAIL OF YOU:</div>
            <div className="field__wrap">
              <textarea
                className="field__textarea"
                ref={descriptionRef}
                defaultValue={userInfo?.playerInfo?.description}
              ></textarea>
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

export default Player;

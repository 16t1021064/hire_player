import IonIcon from "@reacticons/ionicons";
import { routesEnum } from "pages/Routes";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import DefaultThumbnail from "assets/images/default-avatar.jpg";
import clsx from "clsx";
import { useAppSelector } from "hooks/useRedux";

const Profile: FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const callback = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", callback);

    return () => {
      document.removeEventListener("mousedown", callback);
    };
  }, []);

  const onShow = (event: MouseEvent) => {
    event.preventDefault();
    setVisible(true);
  };

  const onChangePassword = (event: MouseEvent) => {
    event.preventDefault();
    setVisible(false);
    history.push(routesEnum.settings_userPassword);
  };

  const onLogout = (event: MouseEvent) => {
    event.preventDefault();
    setVisible(false);
    history.push(routesEnum.logout);
  };

  const onUser = (event: MouseEvent) => {
    event.preventDefault();
    setVisible(false);
    history.push(routesEnum.settings_user);
  };

  return (
    <div
      className={clsx("header__item header__item_profile", visible && "active")}
      ref={wrapperRef}
    >
      <a className="header__head" onClick={onShow}>
        <img
          src={userInfo?.avatar?.link || DefaultThumbnail}
          alt=""
          className="header__pic"
        />
      </a>
      <div className="header__body">
        <a className="header__link" onClick={onUser}>
          <div className="header__img">
            <IonIcon
              className="icon icon-person-outline"
              name="person-outline"
            />
          </div>
          Profile
        </a>
        <a className="header__link" onClick={onChangePassword}>
          <div className="header__img">
            <IonIcon
              className="icon icon-settings-outline"
              name="settings-outline"
            />
          </div>
          Change password
        </a>
        <a className="header__link" onClick={onLogout}>
          <div className="header__img">
            <IonIcon
              className="icon icon-log-out-outline"
              name="log-out-outline"
            />
          </div>
          Log Out
        </a>
      </div>
    </div>
  );
};

export default Profile;

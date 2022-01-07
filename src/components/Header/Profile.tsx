import IonIcon from "@reacticons/ionicons";
import { routesEnum } from "pages/Routes";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DefaultThumbnail from "assets/images/default-avatar.jpg";
import clsx from "clsx";

const Profile: FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

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
    // burgerHeader.removeClass("active");
    // sidebar.removeClass("visible");
    // search.slideUp();
    // items.removeClass("active");
    console.log("inside");
    setVisible(true);
  };

  return (
    <div
      className={clsx("header__item header__item_profile", visible && "active")}
      ref={wrapperRef}
    >
      <a className="header__head" onClick={onShow}>
        <img src={DefaultThumbnail} alt="" className="header__pic" />
      </a>
      <div className="header__body">
        <Link to={routesEnum.settingUserPassword} className="header__link">
          <div className="header__img">
            <IonIcon
              className="icon icon-person-outline"
              name="person-outline"
            />
          </div>
          Profile
        </Link>
        <Link to={routesEnum.settingUserPassword} className="header__link">
          <div className="header__img">
            <IonIcon
              className="icon icon-settings-outline"
              name="settings-outline"
            />
          </div>
          Change password
        </Link>
        <Link to={routesEnum.logout} className="header__link">
          <div className="header__img">
            <IonIcon
              className="icon icon-log-out-outline"
              name="log-out-outline"
            />
          </div>
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Profile;

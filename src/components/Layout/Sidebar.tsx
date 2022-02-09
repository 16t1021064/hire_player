import { ChangeEvent, FC } from "react";
import clsx from "clsx";
import IonIcon from "@reacticons/ionicons";
import Logo from "img/logo.png";
import LogoWhite from "img/logo-white.png";
import { Link } from "react-router-dom";
import { routesEnum } from "pages/Routes";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { setDarkMode } from "store/ducks/system/slice";

interface TMenu {
  text: string;
  href: string;
  icon?: string;
  private?: boolean;
  anonymous?: boolean;
}

const menus: TMenu[] = [
  {
    text: "Home",
    href: routesEnum.home,
    icon: "home-outline",
  },
  {
    text: "Following",
    href: routesEnum.following,
    icon: "person-outline",
    private: true,
  },
  {
    text: "Chat",
    href: routesEnum.chat,
    icon: "chatbubble-outline",
    private: true,
  },
  {
    text: "Sign-in",
    href: routesEnum.login,
    icon: "person-circle-outline",
    anonymous: true,
  },
  {
    text: "Sign-up",
    href: routesEnum.register,
    icon: "person-circle-outline",
    anonymous: true,
  },
];

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ visible, onClose }) => {
  const { isLogin } = useAppSelector((state) => state.auth);
  const { darkMode } = useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();

  const onChangeDarkMode = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(setDarkMode("on"));
    } else {
      dispatch(setDarkMode("off"));
    }
  };

  const onCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <div className={clsx("sidebar", visible && "visible")}>
        <div className="sidebar__top">
          <Link to={routesEnum.home} className="sidebar__logo">
            <img
              src={Logo}
              alt=""
              className="sidebar__pic sidebar__pic_black"
            />
            <img
              src={LogoWhite}
              alt=""
              className="sidebar__pic sidebar__pic_white"
            />
          </Link>
          <button className="sidebar__burger"></button>
          <button className="sidebar__close" onClick={onCloseClick}>
            <IonIcon className="icon icon-close-outline" name="close-outline" />
          </button>
        </div>
        <div className="sidebar__wrapper">
          <div className="sidebar__inner">
            <div className="sidebar__group">
              <div className="sidebar__caption caption-sm">
                <span></span>Menu
              </div>
              <ul className="sidebar-menu">
                {menus
                  .filter((menu) => {
                    if (isLogin) {
                      return (!menu.private && !menu.anonymous) || menu.private;
                    } else {
                      return (
                        (!menu.private && !menu.anonymous) || menu.anonymous
                      );
                    }
                  })
                  .map((menu: TMenu, position: number) => (
                    <li key={position} className="sidebar-item">
                      <Link
                        to={menu.href}
                        className="sidebar-header"
                        onClick={onCloseClick}
                      >
                        <IonIcon
                          className={`icon icon-${menu.icon}`}
                          name={menu.icon as any}
                        />
                        <span>{menu.text}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="sidebar__bottom">
          <label className="switch switch_theme js-switch-theme">
            <input
              className="switch__input"
              type="checkbox"
              onChange={onChangeDarkMode}
              checked={darkMode === "on"}
            />
            <span className="switch__in">
              <span className="switch__box"></span>
              <span className="switch__icon">
                <IonIcon
                  className="icon icon-moon-outline"
                  name="moon-outline"
                />
                <IonIcon
                  className="icon icon-sunny-outline"
                  name="sunny-outline"
                />
              </span>
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

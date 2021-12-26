import { FC, useEffect } from "react";
import clsx from "clsx";
import IonIcon from "@reacticons/ionicons";
import Logo from "img/logo.png";
import LogoWhite from "img/logo-white.png";
import { Link } from "react-router-dom";
import { routesEnum } from "pages/Routes";
import { useAppSelector } from "hooks/useRedux";

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
  classSidebar?: string;
}

const Sidebar: FC<SidebarProps> = ({ classSidebar }) => {
  const { isLogin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log(localStorage.getItem("darkMode"));
    if (localStorage.getItem("darkMode") === "on") {
      document.body.classList.add("dark");
      document.addEventListener("DOMContentLoaded", function () {
        (document.querySelector(".js-switch-theme input") as any).checked =
          true;
      });
    }

    (function () {
      // eslint-disable-next-line no-undef
      const switchTheme = $(".js-switch-theme"),
        // eslint-disable-next-line no-undef
        body = $("body");

      switchTheme.on("change", function () {
        if (!body.hasClass("dark")) {
          body.addClass("dark");
          localStorage.setItem("darkMode", "on");
        } else {
          body.removeClass("dark");
          localStorage.setItem("darkMode", "off");
        }
      });
    })();
  });

  return (
    <>
      <div className={clsx("sidebar", classSidebar)}>
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
          <button className="sidebar__close">
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
                      <Link to={menu.href} className="sidebar-header">
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
            <input className="switch__input" type="checkbox" />
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

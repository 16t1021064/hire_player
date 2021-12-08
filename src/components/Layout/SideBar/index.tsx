import React, { FC, MouseEvent, useMemo } from "react";
import styles from "./index.module.scss";
import LogoImg from "./img/logo.png";
import {
  AccessibilityOutline,
  ChatbubbleOutline,
  HomeOutline,
  MoonOutline,
  PersonAddOutline,
  PersonOutline,
  SunnyOutline,
} from "react-ionicons";
import Switch from "components/Switch";
import { useHistory } from "react-router";
import { routesEnum } from "pages/Routes";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { setTheme } from "store/ducks/system/slice";

interface TMenuItem {
  text: string;
  icon?: any;
  link: string;
}

const SideBar: FC = () => {
  const history = useHistory();
  const { theme } = useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();

  const onChangeMode = (darkMode: boolean) => {
    if (darkMode) {
      dispatch(setTheme("DARK"));
    } else {
      dispatch(setTheme("LIGHT"));
    }
  };

  const menu: TMenuItem[] = useMemo((): TMenuItem[] => {
    return [
      {
        text: "Home",
        icon: <HomeOutline cssClasses={styles.icon} />,
        link: routesEnum.home,
      },
      {
        text: "Following",
        icon: <PersonOutline cssClasses={styles.icon} />,
        link: "#!",
      },
      {
        text: "Player Profile",
        icon: <PersonOutline cssClasses={styles.icon} />,
        link: routesEnum.dashboard,
      },
      {
        text: "Chat",
        icon: <ChatbubbleOutline cssClasses={styles.icon} />,
        link: routesEnum.socket,
      },
      {
        text: "Sign-in",
        icon: <PersonAddOutline cssClasses={styles.icon} />,
        link: routesEnum.login,
      },
      {
        text: "Sign-up",
        icon: <AccessibilityOutline cssClasses={styles.icon} />,
        link: routesEnum.register,
      },
    ];
  }, []);

  const iconTheme: any = useMemo((): any => {
    return theme == "DARK" ? <MoonOutline /> : <SunnyOutline />;
  }, [theme]);

  const onClick = (e: MouseEvent, menu: TMenuItem) => {
    e.preventDefault();
    e.stopPropagation();
    history.push(menu.link);
  };

  return (
    <div className={clsx(styles.sidebar, "bg-mode")}>
      <div className={styles.top}>
        <a className={styles.logo} href="#!">
          <img src={LogoImg} alt="logo" />
        </a>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.group}>
            <div className={styles.caption}>
              <span></span>Menu
            </div>
            <ul className={styles.menu}>
              {menu.map((item: TMenuItem, position: number) => (
                <li key={position} className={styles.item}>
                  <a
                    className={styles.header}
                    href={""}
                    onClick={(e) => {
                      onClick(e, item);
                    }}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Switch
          icon={iconTheme}
          defaultChecked={theme === "DARK"}
          onChange={onChangeMode}
        />
      </div>
    </div>
  );
};

export default SideBar;

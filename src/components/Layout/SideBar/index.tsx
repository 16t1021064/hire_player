import React, { FC, useMemo, useState } from "react";
import styles from "./index.module.scss";
import LogoImg from "./img/logo.png";
import {
  AccessibilityOutline,
  ChatbubbleOutline,
  HomeOutline,
  MoonOutline,
  PersonCircleOutline,
  PersonOutline,
  SunnyOutline,
} from "react-ionicons";
import Switch from "components/Switch";

interface TMenuItem {
  text: string;
  icon?: any;
  link: string;
}

const SideBar: FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const menu: TMenuItem[] = useMemo((): TMenuItem[] => {
    return [
      {
        text: "Home",
        icon: <HomeOutline cssClasses={styles.icon} />,
        link: "#!",
      },
      {
        text: "Following",
        icon: <PersonOutline cssClasses={styles.icon} />,
        link: "#!",
      },
      {
        text: "Player Profile",
        icon: <PersonOutline cssClasses={styles.icon} />,
        link: "#!",
      },
      {
        text: "Chat",
        icon: <ChatbubbleOutline cssClasses={styles.icon} />,
        link: "#!",
      },
      {
        text: "Sign-in",
        icon: <PersonCircleOutline cssClasses={styles.icon} />,
        link: "#!",
      },
      {
        text: "Sign-up",
        icon: <AccessibilityOutline cssClasses={styles.icon} />,
        link: "#!",
      },
    ];
  }, []);

  const iconTheme: any = useMemo((): any => {
    return darkMode ? <MoonOutline /> : <SunnyOutline />;
  }, [darkMode]);

  return (
    <div className={styles.sidebar}>
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
                  <a className={styles.header} href={item.link}>
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
          defaultChecked={darkMode}
          onChange={setDarkMode}
        />
      </div>
    </div>
  );
};

export default SideBar;

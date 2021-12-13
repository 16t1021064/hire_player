import React, { FC, useMemo } from "react";
import styles from "./index.module.scss";
import LogoImg from "./img/logo.png";
import { MoonOutline, SunnyOutline } from "react-ionicons";
import Switch from "components/Form/Switch";
import { routesEnum } from "pages/Routes";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { setTheme } from "store/ducks/system/slice";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserAddOutlined,
  MessageOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";

interface TMenuItem {
  text: string;
  icon?: any;
  link: string;
}

const SideBar: FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.system);
  const { isLogin } = useAppSelector((state) => state.auth);

  const onChangeMode = (darkMode: boolean) => {
    if (darkMode) {
      dispatch(setTheme("DARK"));
    } else {
      dispatch(setTheme("LIGHT"));
    }
  };

  const menu: TMenuItem[] = useMemo((): TMenuItem[] => {
    const menus: TMenuItem[] = [
      {
        text: "Home",
        icon: <HomeOutlined className={styles.icon} />,
        link: routesEnum.home,
      },
      {
        text: "Following",
        icon: <UsergroupAddOutlined className={styles.icon} />,
        link: routesEnum.following,
      },
      {
        text: "Player Profile",
        icon: <UserOutlined className={styles.icon} />,
        link: routesEnum.playerProfile,
      },
      {
        text: "Chat",
        icon: <MessageOutlined className={styles.icon} />,
        link: routesEnum.chat,
      },
    ];

    if (isLogin) {
      menus.push({
        text: "Sign-out",
        icon: <UserDeleteOutlined className={styles.icon} />,
        link: routesEnum.logout,
      });
    } else {
      menus.push({
        text: "Sign-in",
        icon: <UserOutlined className={styles.icon} />,
        link: routesEnum.login,
      });
      menus.push({
        text: "Sign-up",
        icon: <UserAddOutlined className={styles.icon} />,
        link: routesEnum.register,
      });
    }

    return menus;
  }, [isLogin]);

  const iconTheme: any = useMemo((): any => {
    return theme == "DARK" ? <MoonOutline /> : <SunnyOutline />;
  }, [theme]);

  return (
    <div className={clsx(styles.sidebar, "bg-mode")}>
      <div className={styles.top}>
        <Link className={styles.logo} to={routesEnum.home}>
          <img src={LogoImg} alt={"logo"} />
        </Link>
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
                  <Link className={styles.header} to={item.link}>
                    {item.icon}
                    <span>{item.text}</span>
                  </Link>
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

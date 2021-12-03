import { FC, useMemo } from "react";
import styles from "./NavBar.module.scss";
import { Layout, Menu } from "antd";
import Logo from "../../assets/images/logo.png";
import { routesEnum } from "pages/Routes";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAppSelector } from "hooks/useRedux";

interface TMenu {
  text: string;
  href: string;
}

export const NavBar: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { isLogin, userInfo } = useAppSelector((state) => state.auth);

  const menus: TMenu[] = useMemo(() => {
    let results: TMenu[];
    if (isLogin) {
      results = [
        {
          text: userInfo?.name || "Dashboard",
          href: routesEnum.dashboard,
        },
        {
          text: "Socket",
          href: routesEnum.socket,
        },
        {
          text: "Logout",
          href: routesEnum.logout,
        },
      ];
    } else {
      results = [
        {
          text: "Login",
          href: routesEnum.login,
        },
        {
          text: "Register",
          href: routesEnum.register,
        },
      ];
    }
    return results;
  }, [isLogin, userInfo]);

  const selectedMenus: string[] = useMemo(() => {
    const result: string[] = [];
    if (location) {
      menus.forEach((menu, position) => {
        if (menu.href === location.pathname) {
          result.push(`${position}`);
        }
      });
    }
    return result;
  }, [menus, location]);

  const onRedirect = (menu: TMenu) => {
    history.push(menu.href);
  };

  return (
    <Layout.Header className={styles.root}>
      <div className="container">
        <div className={styles.content}>
          <Link className={styles.logo} to={routesEnum.home}>
            <img src={Logo} />
          </Link>
          <Menu
            className={styles.navbar}
            mode="horizontal"
            selectedKeys={selectedMenus}
          >
            {menus.map((menu, position) => (
              <Menu.Item
                key={position}
                onClick={() => {
                  onRedirect(menu);
                }}
              >
                {menu.text}
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </div>
    </Layout.Header>
  );
};

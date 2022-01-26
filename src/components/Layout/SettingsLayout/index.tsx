import IonIcon from "@reacticons/ionicons";
import { FC, useState } from "react";
import { routesEnum } from "pages/Routes";
import Renderer from "./Renderer";
import styles from "./index.module.sass";
import clsx from "clsx";

export interface TMenu {
  text: string;
  href?: string;
  icon?: string;
  subs?: TMenu[];
}

const menus: TMenu[] = [
  {
    text: "User",
    icon: "person-circle-outline",
    subs: [
      {
        text: "User Info",
        href: routesEnum.settings_user,
      },
      {
        text: "Hired List",
        href: routesEnum.settings_userHires,
      },
      {
        text: "Donated List",
        href: routesEnum.settings_userDonates,
      },
      {
        text: "Balance fluctuations",
        href: routesEnum.settings_balanceManage,
      },
    ],
  },
  {
    text: "Player",
    icon: "person-circle",
    subs: [
      {
        text: "Player Info",
        href: routesEnum.settings_player,
      },
      {
        text: "Hire Setting",
        href: routesEnum.settings_playerHire,
      },
      {
        text: "Albums",
        href: routesEnum.settings_playerAlbums,
      },
      {
        text: "Received Hire",
        href: routesEnum.settings_playerHires,
      },
      {
        text: "Received Donate",
        href: routesEnum.settings_playerDonates,
      },
    ],
  },
  {
    text: "Payment Settings",
    icon: "wallet-outline",
    href: routesEnum.settings_payments,
  },
  {
    text: "Balance & Withdraw",
    icon: "cash-outline",
    href: routesEnum.settings_balance,
  },
  {
    text: "Security",
    icon: "cog-outline",
    subs: [
      {
        text: "User Blocks",
        href: routesEnum.settings_blockedUsers,
      },
      {
        text: "Password",
        href: routesEnum.settings_userPassword,
      },
    ],
  },
];

const SettingsLayout: FC = ({ children }) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <div className="setting__menu__mobile">
        <span
          className={clsx(
            "setting__menu__outline",
            styles.mobile,
            visible ? styles.hidden : styles.visible
          )}
          onClick={() => {
            setVisible(true);
          }}
        >
          <IonIcon className="icon icon-menu-outline" name="menu-outline" />
        </span>
        <span
          className={clsx(
            "setting__menu__close",
            styles.mobile,
            visible ? styles.visible : styles.hidden
          )}
          onClick={() => {
            setVisible(false);
          }}
        >
          <IonIcon className="icon icon-close-outline" name="close-outline" />
        </span>
      </div>
      <div className="setting__body">
        <div
          className={clsx(
            "setting__sidebar",
            styles.desktop,
            visible ? styles.visible : styles.hidden
          )}
        >
          <div className="setting__sidebar__wrapper">
            <ul className="sidebar-menu">
              {menus.map((menu, pos: number) => (
                <Renderer key={pos} menu={menu} />
              ))}
            </ul>
          </div>
        </div>
        <div
          className={clsx(
            "setting__content",
            styles.desktop,
            visible ? styles.hidden : styles.visible
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SettingsLayout;

import React, { FC, useEffect } from "react";
import styles from "./index.module.scss";
import {
  UserOutlined,
  WalletOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
  ArrowRightOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import { useHistory, useLocation } from "react-router";

interface MenuItem {
  key: string;
  icon?: any;
  text: string;
  subs?: MenuItem[];
}

export const settingKeys = {
  user: {
    index: "user",
    info: "user.info",
    hired: "user.hired",
    donated: "user.donated",
    balance: "user.balance",
  },
  player: {
    index: "player",
    info: "player.info",
    hire_setting: "player.hire_setting",
    albumns: "player.albumns",
    received_hire: "player.received_hire",
    received_donate: "player.received_donate",
  },
  payment: {
    index: "payment",
  },
  balance: {
    index: "balance",
  },
  security: {
    index: "security",
    blocks: "security.blocks",
    password: "security.password",
  },
};

const menuList: MenuItem[] = [
  {
    key: settingKeys.user.index,
    icon: <UserOutlined className={styles.icon} />,
    text: "User",
    subs: [
      {
        key: settingKeys.user.info,
        text: "User Info",
      },
      {
        key: settingKeys.user.hired,
        text: "Hired List",
      },
      {
        key: settingKeys.user.donated,
        text: "Donated List",
      },
      {
        key: settingKeys.user.balance,
        text: "Balance transactions",
      },
    ],
  },
  {
    key: settingKeys.player.index,
    icon: <UserOutlined className={styles.icon} />,
    text: "Player",
    subs: [
      { key: settingKeys.player.info, text: "Player Info" },
      { key: settingKeys.player.hire_setting, text: "Hire Setting" },
      { key: settingKeys.player.albumns, text: "Albumns" },
      { key: settingKeys.player.received_hire, text: "Received hire" },
      { key: settingKeys.player.received_donate, text: "Received donate" },
    ],
  },
  {
    key: settingKeys.payment.index,
    icon: <WalletOutlined className={styles.icon} />,
    text: "Payment settings",
  },
  {
    key: settingKeys.balance.index,
    icon: <MoneyCollectOutlined className={styles.icon} />,
    text: "Balance & wwithdraw",
  },
  {
    key: settingKeys.security.index,
    icon: <SettingOutlined className={styles.icon} />,
    text: "Security",
    subs: [
      {
        key: settingKeys.security.blocks,
        text: "User Blocks",
      },
      {
        key: settingKeys.security.password,
        text: "Password",
      },
    ],
  },
];

interface SideBarProps {
  activeKey?: string;
  onChangeKey?: (newKey: string) => void;
}

const SideBar: FC<SideBarProps> = ({
  activeKey = settingKeys.user.info,
  onChangeKey,
}) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    history.replace({ ...location, state: { num: 99 } });
  }, []);

  const onClick = (event: React.MouseEvent, key: string) => {
    event.preventDefault();
    if (onChangeKey) {
      onChangeKey(key);
    }
  };

  return (
    <div className={styles.wrap}>
      <ul className={styles.menu}>
        {menuList.map((menu) => (
          <li
            key={menu.key}
            className={clsx(
              styles.item,
              activeKey === menu.key ? styles.active : undefined
            )}
          >
            <a
              onClick={(event) => {
                onClick(event, menu.key);
              }}
              className={styles.link}
            >
              {menu.icon}
              <span>{menu.text}</span>
              {menu?.subs && (
                <div className={styles.direction}>
                  {activeKey.startsWith(`${menu.key}`) ? (
                    <ArrowDownOutlined className={styles.icon} />
                  ) : (
                    <ArrowRightOutlined className={styles.icon} />
                  )}
                </div>
              )}
            </a>
            {menu.subs && (
              <ul
                className={clsx(
                  styles.submenu,
                  activeKey.startsWith(`${menu.key}`) ? styles.open : undefined
                )}
              >
                {menu.subs.map((sub) => (
                  <li
                    key={sub.key}
                    className={clsx(
                      styles.item,
                      activeKey === sub.key ? styles.active : undefined
                    )}
                  >
                    <a
                      onClick={(event) => {
                        onClick(event, sub.key);
                      }}
                      className={styles.link}
                    >
                      {sub.text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;

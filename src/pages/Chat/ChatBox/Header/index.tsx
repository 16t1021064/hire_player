import React, { FC } from "react";
import styles from "./index.module.scss";
import { SettingOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import clsx from "clsx";

interface HeaderProps {
  isMobile?: boolean;
  onBack?: () => void;
}

const Header: FC<HeaderProps> = ({ isMobile = false, onBack }) => {
  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={clsx(styles.title, "h6")}>Tuong Nguyen</div>
      <div className={styles.actions}>
        <button
          className={clsx(styles.action, !isMobile ? styles.hide : undefined)}
          onClick={onClick}
        >
          <ArrowLeftOutlined className={styles.icon} />
        </button>
        <button className={styles.action}>
          <SettingOutlined className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default Header;

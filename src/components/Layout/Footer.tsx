import { FC } from "react";
import styles from "./Footer.module.scss";
import { Layout as AntdLayout } from "antd";

export const Footer: FC = () => {
  return (
    <AntdLayout.Footer className={styles.wrapper}>
      <div className={"container"}>
        <div className={styles.text}>
          © 2021 Hire Player, All Rights Reserved.
        </div>
      </div>
    </AntdLayout.Footer>
  );
};

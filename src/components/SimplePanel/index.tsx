import { Col, Row } from "antd";
import clsx from "clsx";
import { useAppSelector } from "hooks/useRedux";
import React, { FC } from "react";
import styles from "./index.module.scss";

interface SimplePanelProps {
  title: string;
  rightContent?: React.ReactNode;
}

const SimplePanel: FC<SimplePanelProps> = ({
  title,
  rightContent,
  children,
}) => {
  const { theme } = useAppSelector((state) => state.system);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Row>
          <Col flex={"auto"}>
            <div
              className={clsx(
                theme === "DARK" ? styles.titleWhite : styles.titleBlack,
                "h5"
              )}
            >
              {title}
            </div>
          </Col>
          {rightContent && <Col flex={"none"}>{rightContent}</Col>}
        </Row>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default SimplePanel;

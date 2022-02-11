import { FC, useMemo } from "react";
import styles from "./index.module.sass";
import { Spin } from "antd";
import Logo from "assets/images/logo.png";
import clsx from "clsx";

interface LoadingFullpageProps {
  className?: string;
  text?: string;
  forbidden?: boolean;
  notFound?: boolean;
}

export const LoadingFullpage: FC<LoadingFullpageProps> = ({
  className,
  text,
  forbidden,
  notFound,
}) => {
  const tip = useMemo(() => {
    if (text) {
      return text;
    }
    if (forbidden) {
      return "Forbidden";
    }
    if (notFound) {
      return "Not found";
    }
    return undefined;
  }, [text, forbidden, notFound]);

  return (
    <div className={clsx(styles.root, className)}>
      <img src={Logo} className={styles.logo} />
      <Spin tip={tip} className={styles.spin} />
    </div>
  );
};

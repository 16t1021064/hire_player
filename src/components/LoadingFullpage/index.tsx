import { FC } from "react";
import styles from "./styles.module.scss";
import Logo from "../../assets/images/logo.png";
import { Spin } from "antd";

interface LoadingFullpageProps {
  tip?: any;
}

const LoadingFullpage: FC<LoadingFullpageProps> = ({ tip }) => {
  return (
    <div className={styles.root}>
      <img src={Logo} className={styles.logo} />
      <Spin tip={tip} />
    </div>
  );
};

export default LoadingFullpage;

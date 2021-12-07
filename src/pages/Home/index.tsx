import { FC } from "react";
import VipPlayers from "./VipPlayers";
import styles from "./index.module.scss";
import clsx from "clsx";

const Home: FC = () => {
  return (
    <div className={clsx(styles.wrapper, "container")}>
      <VipPlayers />
    </div>
  );
};

export default Home;

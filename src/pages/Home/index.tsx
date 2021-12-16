import { FC } from "react";
import Players from "./Players";
import styles from "./index.module.scss";
import clsx from "clsx";

const Home: FC = () => {
  return (
    <div className={clsx(styles.wrapper, "container")}>
      <Players />
    </div>
  );
};

export default Home;

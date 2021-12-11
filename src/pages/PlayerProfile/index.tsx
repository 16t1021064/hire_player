import Rating from "components/Rating";
import SimplePanel from "components/SimplePanel";
import { FC } from "react";
import Header from "./Header";
import styles from "./index.module.scss";
import Infomation from "./Infomation";

const PlayerProfile: FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <SimplePanel title={"Information"}>
        <Infomation />
      </SimplePanel>
      <SimplePanel title={"Rating"}>
        <Rating />
        <Rating />
      </SimplePanel>
    </div>
  );
};

export default PlayerProfile;

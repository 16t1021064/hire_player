import { FC } from "react";
import styles from "./index.module.scss";
import AvatarImage from "./img/ava-tuong.jpeg";
import clsx from "clsx";
import Button from "components/Button";
import { ChatbubbleEllipsesOutline } from "react-ionicons";

const Header: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.details}>
          <div className={styles.avatar}>
            <img className={styles.pic} src={AvatarImage} alt={""} />
          </div>
          <div className={styles.wrap}>
            <div className={clsx(styles.man, "h2", styles.confirm)}>
              Tuong Nguyen
            </div>
            <div className={styles.parameters}>
              <div className={styles.parameter}>
                {" "}
                <span>HAS BEEN HIRED</span>
                <strong>3000 hour</strong>
              </div>
              <div className={styles.parameter}>
                {" "}
                <span>COMPLETION RATE </span>
                <strong>93.67 %</strong>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.btns}>
          <Button type={"primary"} size={"small"}>
            Hire
          </Button>
          <Button type={"ghost"} size={"small"}>
            Donate
          </Button>
          <Button type={"ghost"} size={"small"}>
            <ChatbubbleEllipsesOutline />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;

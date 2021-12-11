import Button from "components/Button";
import { FC } from "react";
import styles from "./index.module.scss";
import { SmileOutlined } from "@ant-design/icons";
import ChatItem from "./ChatItem";

const Body: FC = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.list}>
        <ChatItem />
      </div>
      <div className={styles.foot}>
        <input
          className={styles.input}
          type="text"
          placeholder="Send a message…"
        />
        <Button className={styles.button} type={"primary"}>
          Send
        </Button>
        <button className={styles.smile}>
          <SmileOutlined className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default Body;

import useMediaQuery from "hooks/useMediaQuery";
import { FC, useCallback, useState } from "react";
import { SM_MAX_QUERY } from "utils/mediaQuery";
import ChatBox from "./ChatBox";
import ChatList from "./ChatList";
import styles from "./index.module.scss";

const Chat: FC = () => {
  const isMobile = useMediaQuery(SM_MAX_QUERY);
  const [activeWidget, setActiveWidget] = useState<"LIST" | "BOX">("LIST");

  const onSelect = useCallback(() => {
    if (isMobile) {
      setActiveWidget("BOX");
    }
  }, [isMobile]);

  const onBack = useCallback(() => {
    if (isMobile) {
      setActiveWidget("LIST");
    }
  }, [isMobile]);

  return (
    <div className={styles.chat}>
      {!isMobile || (isMobile && activeWidget === "LIST") ? (
        <ChatList isMobile={isMobile} onSelect={onSelect} />
      ) : undefined}
      {!isMobile || (isMobile && activeWidget === "BOX") ? (
        <ChatBox isMobile={isMobile} onBack={onBack} />
      ) : undefined}
    </div>
  );
};

export default Chat;

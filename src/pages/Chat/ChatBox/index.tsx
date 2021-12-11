import clsx from "clsx";
import { FC } from "react";
import Body from "./Body";
import Header from "./Header";
import styles from "./index.module.scss";

interface ChatBoxProps {
  isMobile?: boolean;
  onBack?: () => void;
}

const ChatBox: FC<ChatBoxProps> = ({ isMobile = false, onBack }) => {
  return (
    <div className={clsx(styles.wrap, isMobile ? styles.mobile : undefined)}>
      <Header isMobile={isMobile} onBack={onBack} />
      <Body />
    </div>
  );
};

export default ChatBox;

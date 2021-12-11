import clsx from "clsx";
import { FC } from "react";
import ChatItem from "./ChatItem";
import styles from "./index.module.scss";

interface ChatListProps {
  isMobile?: boolean;
  onSelect?: () => void;
}

const ChatList: FC<ChatListProps> = ({ isMobile = false, onSelect }) => {
  return (
    <div className={clsx(styles.wrap, isMobile ? styles.mobile : undefined)}>
      <div className={styles.item}>
        <div className={styles.body}>
          <ChatItem active={true} onSelect={onSelect} />
          <ChatItem online={true} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
};

export default ChatList;

import clsx from "clsx";
import Avatar from "components/Avatar";
import React, { FC } from "react";
import styles from "./index.module.scss";

interface ChatItemProps {
  online?: boolean;
  active?: boolean;
  onSelect?: () => void;
}

const ChatItem: FC<ChatItemProps> = ({
  online = false,
  active = false,
  onSelect,
}) => {
  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <a
      className={clsx(styles.line, active ? styles.active : undefined)}
      onClick={onClick}
    >
      <Avatar size={"sm"} online={online} />
      <div className={styles.details}>
        <div>Tuong Nguyen</div>
        <div className={styles.time}>3m ago</div>
      </div>
    </a>
  );
};

export default ChatItem;

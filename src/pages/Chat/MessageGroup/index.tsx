import { FC } from "react";
import DefaultAvatar from "assets/images/default-avatar.jpg";
import Message from "./Message";
import TimeAgo from "react-timeago";
import { TBodyMessage } from "types";

export interface TMessageGroup {
  avatar?: string;
  senderId?: string;
  name?: string;
  time?: string;
  messages?: TBodyMessage[];
}

interface MessageGroupProps {
  group: TMessageGroup;
}

const MessageGroup: FC<MessageGroupProps> = ({ group }) => {
  return (
    <div className="chat_messenger__item">
      <div className="chat_messenger__ava">
        <img
          src={group?.avatar || DefaultAvatar}
          alt=""
          className="chat_messenger__pic"
        />
      </div>
      <div className="chat_messenger__details">
        <div className="chat_messenger__top">
          <div className="chat_messenger__man">{group?.name || "Unknown"}</div>
          <div className="chat_messenger__time">
            <TimeAgo date={group?.time || 0} />
          </div>
        </div>
        <div className="chat_messenger__group">
          {group?.messages?.map((message, num: number) => (
            <Message key={num} body={message} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageGroup;

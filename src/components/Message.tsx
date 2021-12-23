import { FC } from "react";

interface MessageProps {
  text?: string;
}

const Message: FC<MessageProps> = ({ text }) => {
  return <div className="messenger__text">{text}</div>;
};

export default Message;

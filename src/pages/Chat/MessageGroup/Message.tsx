import { FC } from "react";

const Message: FC = ({ children }) => {
  return <div className="messenger__text">{children}</div>;
};

export default Message;

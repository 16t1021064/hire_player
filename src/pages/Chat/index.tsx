import { FC, useState } from "react";
import { TConversation, TUser } from "types";
import ChatBox from "./ChatBox";
import SideBar from "./SideBar";

export interface TConvertedConversation extends TConversation {
  target?: TUser;
}

const Chat: FC = () => {
  const [activeConv, setActiveConv] = useState<
    TConvertedConversation | undefined
  >(undefined);

  return (
    <div className="chat">
      <div className="chat__sidebar">
        <SideBar onChangeConv={setActiveConv} />
      </div>
      <div className="chat_messenger">
        {activeConv && <ChatBox conv={activeConv} />}
      </div>
    </div>
  );
};

export default Chat;

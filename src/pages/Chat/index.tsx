import { FC, useEffect, useState } from "react";
import { TConversation, TUser } from "types";
import ChatBox from "./ChatBox";
import SideBar from "./SideBar";
import useSocket from "hooks/useSocket";
import { useAppSelector } from "hooks/useRedux";
import { SocketEvents } from "socket";
import { TEventData_StartOnline } from "socket/types";

export interface TConvertedConversation extends TConversation {
  target?: TUser;
}

const Chat: FC = () => {
  const [activeConv, setActiveConv] = useState<
    TConvertedConversation | undefined
  >(undefined);
  const { socket, connected } = useSocket();
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (connected && userInfo) {
      const startOnlineData: TEventData_StartOnline = {
        userId: userInfo.id,
      };
      socket?.emit(SocketEvents.startOnline, startOnlineData);
    }
  }, [connected, userInfo]);

  return (
    <div className="chat">
      <div className="chat__sidebar">
        <SideBar
          activeConv={activeConv}
          onChangeConv={setActiveConv}
          socket={socket}
          connected={connected}
        />
      </div>
      <div className="chat_messenger">
        {activeConv && (
          <ChatBox conv={activeConv} socket={socket} connected={connected} />
        )}
      </div>
    </div>
  );
};

export default Chat;

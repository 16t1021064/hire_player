import { FC, useEffect, useState } from "react";
import { TConversation, TUser } from "types";
import ChatBox from "./ChatBox";
import SideBar from "./SideBar";
import useSocket from "hooks/useSocket";
import { useAppSelector } from "hooks/useRedux";
import { SocketEvents, SocketListeners } from "socket";
import {
  TEventData_StartOnline,
  TListenerData_OnConversations,
  TListenerData_OnStartOnline,
} from "socket/types";

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

      socket?.on(
        SocketListeners.onStartOnline,
        (data: TListenerData_OnStartOnline) => {
          console.log(SocketListeners.onStartOnline, data.UsersOnline);
        }
      );

      socket?.on(
        SocketListeners.onConversations,
        (data: TListenerData_OnConversations) => {
          console.log(SocketListeners.onConversations, data);
        }
      );
    }
  }, [connected, userInfo]);

  return (
    <div className="chat">
      <div className="chat__sidebar">
        <SideBar
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

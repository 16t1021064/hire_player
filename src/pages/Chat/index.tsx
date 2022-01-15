import { FC, useEffect, useState } from "react";
import { TConvertedConversation, THire } from "types";
import ChatBox from "./ChatBox";
import SideBar from "./SideBar";
import useSocket from "hooks/useSocket";
import { useAppSelector } from "hooks/useRedux";
import { SocketEvents } from "socket";
import { TEventData_StartOnline } from "socket/types";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { getConversationRequest } from "api/conversations/request";
import { fnConvertConversation } from "utils/message";
import { getHireRequest } from "api/hires/request";

export const chatDefaultState: string = "chat_chatDefaultState";
export const hireState: string = "chat_HireState";

const Chat: FC = () => {
  const [activeConv, setActiveConv] = useState<
    TConvertedConversation | undefined
  >(undefined);
  const { socket, connected } = useSocket();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const history = useHistory();
  const location = useLocation();
  const [hire, setHire] = useState<THire | undefined>(undefined);

  const { mutate: getConversation } = useMutation(getConversationRequest, {
    onSuccess: (data) => {
      const converted: TConvertedConversation | undefined =
        fnConvertConversation(data.data, userInfo?.id);
      if (converted) {
        setActiveConv({ ...converted });
      }
    },
  });

  const { mutate: getHire } = useMutation(getHireRequest, {
    onSuccess: (data) => {
      setHire(data.data);
    },
  });

  useEffect(() => {
    let clearState = false;
    if (location?.state && (location.state as any)?.[chatDefaultState]) {
      const value = (location.state as any)[chatDefaultState];
      clearState = true;
      getConversation({ id: value });
    }
    if (location?.state && (location.state as any)?.[hireState]) {
      const value = (location.state as any)[hireState];
      clearState = true;
      getHire({ id: value });
    }
    if (clearState) {
      history.replace({ ...location, state: undefined });
    }
  }, [location]);

  useEffect(() => {
    if (connected && userInfo) {
      const startOnlineData: TEventData_StartOnline = {
        userId: userInfo.id,
      };
      socket?.emit(SocketEvents.startOnline, startOnlineData);
    }
  }, [connected, userInfo]);

  const onChangeConv = (conv: TConvertedConversation) => {
    setHire(undefined);
    setActiveConv(conv);
  };

  return (
    <div className="chat">
      <div className="chat__sidebar">
        <SideBar
          activeConv={activeConv}
          onChangeConv={onChangeConv}
          socket={socket}
          connected={connected}
        />
      </div>
      <div className="chat_messenger">
        {activeConv && (
          <ChatBox
            conv={activeConv}
            socket={socket}
            connected={connected}
            hire={hire}
            onChangeHire={setHire}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;

import { FC, useEffect, useRef, useState } from "react";
import { TConversation, TConvertedConversation, THire } from "types";
import ChatBox from "./ChatBox";
import SideBar from "./SideBar";
import useSocket from "hooks/useSocket";
import { useAppSelector } from "hooks/useRedux";
import { SocketEvents, SocketListeners } from "socket";
import { TEventData_StartOnline, TListenerData_OnHires } from "socket/types";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { getConversationRequest } from "api/conversations/request";
import { fnConvertConversation } from "utils/message";
import { getHireRequest } from "api/hires/request";
import clsx from "clsx";
import styles from "./index.module.sass";

export const chatDefaultState: string = "chat_chatDefaultState";

const Chat: FC = () => {
  const [activeConv, setActiveConv] = useState<
    TConvertedConversation | undefined
  >(undefined);
  const { socket, connected } = useSocket();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const history = useHistory();
  const location = useLocation();
  const [hire, setHire] = useState<THire | undefined>(undefined);
  const handleOnHiresRef = useRef<
    ((data: TListenerData_OnHires) => void) | null
  >(null);
  const [visibleSidebar, setVisibleSidebar] = useState<boolean>(true);

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

  useEffect(() => {
    if (!activeConv || !activeConv.latestHire) return;
    let hireId = "";
    if (typeof activeConv.latestHire === "string") {
      hireId = activeConv.latestHire;
    } else {
      hireId = activeConv.latestHire.id;
    }
    if (activeConv?.latestHire) {
      getHire({ id: hireId });
    }
  }, [activeConv]);

  const onChangeConv = (conv: TConvertedConversation | undefined) => {
    setHire(undefined);
    setActiveConv(conv);
    setVisibleSidebar(false);
  };

  const handleOnHires = (data: TListenerData_OnHires) => {
    let convId = data.conversation;
    if (typeof convId !== "string") {
      convId = (data.conversation as TConversation).id;
    }
    if (activeConv?.id === convId) {
      setHire(data);
    }
  };

  useEffect(() => {
    if (!connected) {
      return;
    }
    if (handleOnHiresRef.current) {
      socket?.removeListener(SocketListeners.onHires, handleOnHiresRef.current);
    }
    handleOnHiresRef.current = handleOnHires;
    socket?.on(SocketListeners.onHires, handleOnHiresRef.current);
  }, [connected, activeConv]);

  const onBack = () => {
    setVisibleSidebar(true);
  };

  return (
    <div className="chat">
      <div
        className={clsx(
          "chat__sidebar",
          styles.sidebar,
          visibleSidebar && styles.visibleSidebar
        )}
      >
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
            onChangeConv={onChangeConv}
            onBack={onBack}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;

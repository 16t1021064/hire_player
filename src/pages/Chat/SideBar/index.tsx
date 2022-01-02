import { FC, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import DefaultAvatar from "assets/images/default-avatar.jpg";
import { TConversation, TUser } from "types";
import { useAppSelector } from "hooks/useRedux";
import { useMutation } from "react-query";
import { getConversationsRequest } from "api/conversations/request";
import { TConvertedConversation } from "..";
import ReactTimeago from "react-timeago";
import clsx from "clsx";
import styles from "./index.module.sass";
import { Socket } from "socket.io-client";
import {
  TListenerData_OnConversations,
  TListenerData_OnMessages,
} from "socket/types";
import { SocketListeners } from "socket";

const LIMIT: number = 8;

const fnConvertConversation = (
  conversation: TConversation,
  fixedId: string | undefined
): TConvertedConversation | undefined => {
  let converted: TConvertedConversation | undefined = undefined;
  const player = conversation?.player as TUser;
  const user = conversation?.customer as TUser;
  if (fixedId !== player.id && player) {
    converted = { ...conversation, target: player };
  } else if (fixedId !== user.id && user) {
    converted = { ...conversation, target: user };
  }
  return converted;
};

interface SideBarProps {
  onChangeConv: (conv: TConvertedConversation) => void;
  socket: Socket | undefined;
  connected: boolean;
}

const SideBar: FC<SideBarProps> = ({ onChangeConv, socket, connected }) => {
  const [conversations, setConversations] = useState<TConversation[]>([]);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const handleOnConversationsRef = useRef<
    ((data: TListenerData_OnConversations) => void) | null
  >(null);
  const handleOnMessagesRef = useRef<
    ((data: TListenerData_OnMessages) => void) | null
  >(null);

  const { mutate: fetchConversations } = useMutation(getConversationsRequest, {
    onSuccess: (data) => {
      setConversations([...data.data.results]);
    },
  });

  useEffect(() => {
    if (userInfo) {
      fetchConversations({
        limit: LIMIT,
        page: 1,
        populate: "customer|player",
        sortBy: "updatedAt:desc",
      });
    }
  }, [userInfo]);

  const convertedConversations: (TConvertedConversation | undefined)[] =
    useMemo(() => {
      return conversations.map((conversation) =>
        fnConvertConversation(conversation, userInfo?.id)
      );
    }, [conversations]);

  const onSelectMessage = (
    event: MouseEvent,
    conversation: TConvertedConversation
  ) => {
    event.preventDefault();
    onChangeConv(conversation);
  };

  const handleOnConversations = (data: TListenerData_OnConversations) => {
    let hasChange = false;
    const cloneConvs = [...conversations];
    for (let i = 0; i < cloneConvs.length; i = i + 1) {
      if (cloneConvs[i].id === data.id) {
        cloneConvs[i] = data;
        hasChange = true;
      }
    }
    if (hasChange) {
      setConversations(cloneConvs);
    }
  };

  useEffect(() => {
    if (!connected) {
      return;
    }
    if (handleOnConversationsRef.current) {
      socket?.removeListener(
        SocketListeners.onConversations,
        handleOnConversationsRef.current
      );
    }
    handleOnConversationsRef.current = handleOnConversations;
    socket?.on(
      SocketListeners.onConversations,
      handleOnConversationsRef.current
    );
  }, [connected, conversations]);

  const handleOnMessages = (data: TListenerData_OnMessages) => {
    const latestMessage = { ...data.latestMessage, sender: data.sender };
    const conv = { ...data.conversation, latestMessage };
    const clonedConvs = [...conversations];
    let hasChange = false;
    for (let i = 0; i < clonedConvs.length; i = i + 1) {
      if (clonedConvs[i].id === conv.id) {
        clonedConvs[i] = conv;
        hasChange = true;
      }
    }
    if (hasChange) {
      setConversations(clonedConvs);
    }
  };

  useEffect(() => {
    if (!connected) {
      return;
    }
    if (handleOnMessagesRef.current) {
      socket?.removeListener(
        SocketListeners.onMessages,
        handleOnMessagesRef.current
      );
    }
    handleOnMessagesRef.current = handleOnMessages;
    socket?.on(SocketListeners.onMessages, handleOnMessagesRef.current);
  }, [connected, conversations]);

  return (
    <div className="chat__item active">
      <div
        className="chat__body"
        style={{
          display: "block",
        }}
      >
        {convertedConversations.map((conversation, pos: number) =>
          conversation ? (
            <a
              key={pos}
              className="chat__line"
              onClick={(event) => {
                onSelectMessage(event, conversation);
              }}
            >
              <div
                className={clsx(
                  "ava",
                  conversation?.target?.isOnline && "ava_online"
                )}
              >
                <img
                  src={conversation?.target?.avatar?.link || DefaultAvatar}
                  alt=""
                  className="ava__pic"
                />
              </div>
              <div className="chat__details">
                <div
                  className={clsx(
                    "chat__man",
                    userInfo &&
                      conversation?.latestMessage?.unreadStatus?.[
                        userInfo?.id
                      ] &&
                      styles.unread
                  )}
                >
                  {conversation?.target?.userName || "Unknown"}
                </div>
                <div className="chat__time">
                  {conversation?.latestMessage?.createdAt && (
                    <ReactTimeago date={conversation.latestMessage.createdAt} />
                  )}
                </div>
              </div>
            </a>
          ) : undefined
        )}
      </div>
    </div>
  );
};

export default SideBar;

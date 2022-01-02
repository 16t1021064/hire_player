import IonIcon from "@reacticons/ionicons";
import {
  createMessageRequest,
  getMessagesRequest,
  readMessagesRequest,
} from "api/messages/request";
import { useAppSelector } from "hooks/useRedux";
import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { SocketListeners } from "socket";
import { Socket } from "socket.io-client";
import { TListenerData_OnMessages } from "socket/types";
import { TPagination } from "types";
import { generateGroups } from "utils/message";
import { TConvertedConversation } from "..";
import MessageGroup, { TMessageGroup } from "../MessageGroup";

interface ChatBoxProps {
  conv: TConvertedConversation;
  socket: Socket | undefined;
  connected: boolean;
}

const ChatBox: FC<ChatBoxProps> = ({ conv, socket, connected }) => {
  const [messageGroups, setMessageGroups] = useState<TMessageGroup[]>([]);
  const [messagesPagination, setMessagesPagination] = useState<TPagination>({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  });
  const messageRef = useRef<HTMLInputElement | null>(null);
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const handleOnMessagesRef = useRef<
    ((data: TListenerData_OnMessages) => void) | null
  >(null);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [focusText, setFocusText] = useState<boolean>(false);

  const { mutate: fetchMessages } = useMutation(getMessagesRequest, {
    onSuccess: (data) => {
      setMessageGroups(messageGroups.concat(generateGroups(data.data.results)));
      setMessagesPagination({
        ...messagesPagination,
        page: data.data.page,
        limit: data.data.limit,
        totalPages: data.data.totalPages,
        totalResults: data.data.totalResults,
      });
      fnFocusBox();
    },
  });

  const { mutate: readMessages } = useMutation(readMessagesRequest);

  const { mutate: createMessage, status: createMessageStatus } = useMutation(
    createMessageRequest,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  useEffect(() => {
    setMessageGroups([]);
    setMessagesPagination({
      ...messagesPagination,
      page: 1,
      limit: 10,
      totalPages: 1,
      totalResults: 0,
    });
    setTimeout(() => {
      fetchMessages({
        id: conv.id,
        sortBy: "createdAt:desc",
        limit: messagesPagination.limit,
        page: messagesPagination.page,
        populate: "sender",
      });
    });
  }, [conv]);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      createMessageStatus !== "loading" &&
      messageRef.current?.value &&
      userInfo
    ) {
      createMessage({
        id: conv.id,
        body: {
          content: messageRef.current.value,
        },
        senderId: userInfo.id,
      });
      messageRef.current.value = "";
    }
  };

  const handleOnMessages = (data: TListenerData_OnMessages) => {
    const latestMessage = { ...data.latestMessage, sender: data.sender };
    const newMessageGroups = messageGroups.concat(
      generateGroups([latestMessage])
    );
    setMessageGroups(newMessageGroups);
    fnFocusBox();
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
  }, [connected, messageGroups]);

  const fnFocusBox = () => {
    setTimeout(() => {
      if (chatListRef.current) {
        (chatListRef.current as any).scrollTop =
          chatListRef.current?.scrollHeight;
      }
      messageRef.current?.focus();
    });
  };

  useEffect(() => {
    readMessages({ id: conv.id });
  }, [focusText]);

  return (
    <>
      <div className="chat_messenger__head">
        <div className="chat_messenger__title h6 mr-auto">
          {`${conv?.target?.userName}${
            conv?.target?.playerInfo?.playerName
              ? " - " + conv.target.playerInfo.playerName
              : ""
          }`}
        </div>
        <div className="chat__actions">
          <button className="chat__action chat__action__btn__back__chat">
            <IonIcon
              className="icon icon-arrow-back-outline"
              name="arrow-back-outline"
            />
          </button>
          <button className="chat__action">
            <IonIcon
              className="icon icon-settings-outline"
              name="settings-outline"
            />
          </button>
        </div>
      </div>
      <div className="chat_messenger__body">
        <div className="chat_messenger__list" ref={chatListRef}>
          {messageGroups.map((messageGroup, num: number) => (
            <MessageGroup key={num} group={messageGroup} />
          ))}
        </div>
        <form className="chat_messenger__foot" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Send a message…"
            className="chat_messenger__input"
            ref={messageRef}
            onFocus={() => {
              setFocusText(true);
            }}
            onBlur={() => {
              setFocusText(false);
            }}
          />
          <button type="submit" className="chat_messenger__btn btn btn_primary">
            Send
          </button>
          <button type="button" className="chat_messenger__smile">
            <IonIcon className="icon icon-happy-outline" name="happy-outline" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBox;

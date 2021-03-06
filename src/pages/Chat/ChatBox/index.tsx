import { getMessagesRequest } from "api/messages/request";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "react-query";
import { SocketListeners } from "socket";
import { Socket } from "socket.io-client";
import { TListenerData_OnMessages } from "socket/types";
import { THire, TPagination } from "types";
import { generateGroups } from "utils/message";
import { TConvertedConversation } from "types";
import MessageGroup, { TMessageGroup } from "../MessageGroup";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./index.module.sass";
import { Col, Row } from "antd";
import Footer, { FooterMethods } from "./Footer";
import clsx from "clsx";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./Header";

interface ChatBoxProps {
  conv: TConvertedConversation;
  socket: Socket | undefined;
  connected: boolean;
  hire?: THire | undefined;
  onChangeHire: (hire: THire) => void;
  onChangeConv: (conv: TConvertedConversation | undefined) => void;
  onBack: () => void;
}

const ChatBox: FC<ChatBoxProps> = ({
  conv,
  socket,
  connected,
  hire,
  onChangeHire,
  onChangeConv,
  onBack,
}) => {
  const [groups, setGroups] = useState<TMessageGroup[]>([]);
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  });
  const handleOnMessagesRef = useRef<
    ((data: TListenerData_OnMessages) => void) | null
  >(null);
  const footerRef = useRef<FooterMethods | null>(null);
  const lockFocusRef = useRef<boolean>(false);
  const lastestMessageRef = useRef<string | undefined>(undefined);

  const { mutate: fetch, status: fetchStatus } = useMutation(
    getMessagesRequest,
    {
      onSuccess: (data) => {
        const len = data.data.results.length;
        if (len > 0) {
          lastestMessageRef.current = data.data.results[len - 1].id;
        }
        const newGroups = generateGroups(data.data.results);
        setGroups(groups.concat(newGroups));
        setPagination({
          ...pagination,
          page: data.data.page,
          limit: data.data.limit,
          totalPages: data.data.totalPages,
          totalResults: data.data.totalResults,
        });
        if (!lockFocusRef.current) {
          footerRef.current?.focus();
          lockFocusRef.current = true;
        }
      },
    }
  );

  useEffect(() => {
    lastestMessageRef.current = undefined;
    setGroups([]);
    setPagination({
      ...pagination,
      page: 1,
      limit: 10,
      totalPages: 1,
      totalResults: 0,
    });
    setTimeout(() => {
      fetch({
        id: conv.id,
        sortBy: "createdAt:desc",
        limit: 15,
        page: pagination.page,
        populate: "sender",
      });
    });
  }, [conv]);

  const handleOnMessages = (data: TListenerData_OnMessages) => {
    if (data.conversation.id !== conv.id) return;
    const latestMessage = { ...data.latestMessage, sender: data.sender };
    const newGroups = generateGroups([latestMessage]);
    setGroups(newGroups.concat(groups));
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
  }, [connected, groups]);

  const hasMore = useMemo((): boolean => {
    if (
      pagination.limit &&
      pagination.totalResults &&
      pagination.limit < pagination.totalResults
    ) {
      return true;
    } else {
      return false;
    }
  }, [pagination]);

  const fetchMore = () => {
    if (hasMore && fetchStatus !== "loading") {
      fetch({
        id: conv.id,
        sortBy: "createdAt:desc",
        limit: pagination.limit,
        page: 1,
        populate: "sender",
        latestMessageId: lastestMessageRef.current,
      });
    }
  };

  return (
    <>
      <Header
        conv={conv}
        hire={hire}
        onChangeHire={onChangeHire}
        onChangeConv={onChangeConv}
        onBack={onBack}
      />
      <div className="chat_messenger__body">
        <div
          id="chatScroll"
          className={clsx("chat_messenger__list", styles.list)}
        >
          <InfiniteScroll
            className={styles.scroll}
            dataLength={groups.length || 0}
            next={fetchMore}
            hasMore={hasMore}
            loader={
              <Row justify="center">
                <Col>
                  <LoadingOutlined className={styles.loading} />
                </Col>
              </Row>
            }
            inverse
            scrollableTarget="chatScroll"
          >
            {groups.map((group: TMessageGroup, num: number) => (
              <MessageGroup key={num} group={group} />
            ))}
          </InfiniteScroll>
        </div>
        <Footer conv={conv} ref={footerRef} />
      </div>
    </>
  );
};

export default ChatBox;

import IonIcon from "@reacticons/ionicons";
import { getMessagesRequest } from "api/messages/request";
import { FC, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { TPagination } from "types";
import { generateGroups } from "utils/message";
import { TConvertedConversation } from "..";
import MessageGroup, { TMessageGroup } from "../MessageGroup";

interface ChatBoxProps {
  conv: TConvertedConversation;
}

const ChatBox: FC<ChatBoxProps> = ({ conv }) => {
  const [messageGroups, setMessageGroups] = useState<TMessageGroup[]>([]);
  const [messagesPagination, setMessagesPagination] = useState<TPagination>({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  });

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
    },
  });

  useEffect(() => {
    setMessageGroups([]);
    fetchMessages({
      id: conv.id,
      sortBy: "createdAt:desc",
      limit: messagesPagination.limit,
      page: messagesPagination.page,
      populate: "sender",
    });
  }, [conv]);

  return (
    <>
      <div className="chat_messenger__head">
        <div className="chat_messenger__title h6 mr-auto">
          {conv?.target?.playerInfo?.playerName}
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
        <div className="chat_messenger__list">
          {messageGroups.map((messageGroup, num: number) => (
            <MessageGroup key={num} group={messageGroup} />
          ))}
        </div>
        <div className="chat_messenger__foot">
          <input
            type="text"
            placeholder="Send a message…"
            className="chat_messenger__input"
          />
          <button className="chat_messenger__btn btn btn_primary">Send</button>
          <button className="chat_messenger__smile">
            <IonIcon className="icon icon-happy-outline" name="happy-outline" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBox;

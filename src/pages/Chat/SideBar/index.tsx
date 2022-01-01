import { FC, MouseEvent, useEffect, useMemo, useState } from "react";
import DefaultAvatar from "assets/images/default-avatar.jpg";
import { TConversation, TUser } from "types";
import { useAppSelector } from "hooks/useRedux";
import { useMutation } from "react-query";
import { getConversationsRequest } from "api/conversations/request";
import { TConvertedConversation } from "..";
import ReactTimeago from "react-timeago";
import clsx from "clsx";

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
}

const SideBar: FC<SideBarProps> = ({ onChangeConv }) => {
  const [conversations, setConversations] = useState<TConversation[]>([]);
  const userInfo = useAppSelector((state) => state.auth.userInfo);

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
                <div className="chat__man">
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

import { FC, MouseEvent, useEffect, useMemo, useState } from "react";
import DefaultAvatar from "assets/images/default-avatar.jpg";
import { TConversation, TUser } from "types";
import { useAppSelector } from "hooks/useRedux";
import { useMutation } from "react-query";
import { getConversationsRequest } from "api/conversations/request";
import { TConvertedConversation } from "..";
import ReactTimeago from "react-timeago";

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
        customerId: userInfo.id,
        playerId: userInfo.id,
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
              <div className="ava ava_online">
                <img
                  src={
                    conversation?.target?.playerInfo?.playerAvatar?.link ||
                    DefaultAvatar
                  }
                  alt=""
                  className="ava__pic"
                />
              </div>
              <div className="chat__details">
                <div className="chat__man">
                  {conversation?.target?.playerInfo?.playerName || "Unknown"}
                </div>
                <div className="chat__time">
                  <ReactTimeago date={conversation.createdAt || 0} />
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

import { TMessageGroup } from "pages/Chat/MessageGroup";
import { TConversation, TConvertedConversation, TMessage, TUser } from "types";

const MILISECONDS_DIFF = 1000 * 60;

/**
 * Grouping messages within a period time and sender for displaying
 * @param messages Array messages need to grouping
 * @returns
 */
export const generateGroups = (messages: TMessage[]): TMessageGroup[] => {
  let results: TMessageGroup[] = [];
  results = messages.reduce((groups: TMessageGroup[], message: TMessage) => {
    const prevPos = groups?.length > 0 ? groups.length - 1 : undefined;
    const sender = (message?.sender as TUser) || undefined;

    // inital array is empty, add new group
    if (!prevPos) {
      groups.push({
        avatar: sender?.avatar?.link,
        senderId: sender?.id,
        name: sender?.userName,
        time: message?.createdAt,
        messages: [message?.body?.content || ""],
      });
      return groups;
    }

    // check time and grouping messages
    const createdAt = message?.createdAt;
    if (!createdAt) {
      return groups;
    }

    const timeMiliseconds = new Date(groups[prevPos].time || 0).getTime();
    const createdAtMiliseconds = new Date(createdAt).getTime();
    const diff = timeMiliseconds - createdAtMiliseconds;

    if (diff < MILISECONDS_DIFF && sender?.id === groups[prevPos]?.senderId) {
      // within period, add message to group
      groups[prevPos].time = createdAt;
      groups[prevPos]?.messages?.push(message?.body?.content || "");
    } else {
      // out of period, add new group
      groups.push({
        avatar: sender?.avatar?.link,
        senderId: sender?.id,
        name: sender?.userName,
        time: message?.createdAt,
        messages: [message?.body?.content || ""],
      });
    }

    return groups;
  }, []);

  return results;
};

export const fnConvertConversation = (
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

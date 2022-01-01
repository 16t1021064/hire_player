import { TMessageGroup } from "pages/Chat/MessageGroup";
import { TMessage, TUser } from "types";

const MILISECONDS_DIFF = 1000 * 60;

/**
 * Grouping messages within a period time and sender for displaying
 * @param messages Array messages need to grouping
 * @returns
 */
export const generateGroups = (messages: TMessage[]): TMessageGroup[] => {
  let results: TMessageGroup[] = [];
  messages.reverse();
  results = messages.reduce(
    (prevGroups: TMessageGroup[], message: TMessage) => {
      const prevPos =
        prevGroups?.length > 0 ? prevGroups.length - 1 : undefined;
      const sender = (message?.sender as TUser) || undefined;

      // inital array is empty, add new group
      if (!prevPos) {
        prevGroups.push({
          avatar: sender?.avatar?.link,
          senderId: sender?.id,
          name: sender?.userName,
          time: message?.createdAt,
          messages: [message?.body?.content || ""],
        });
        return prevGroups;
      }

      // check time and grouping messages
      const createdAt = message?.createdAt;
      if (!createdAt) {
        return prevGroups;
      }

      const timeMiliseconds = new Date(prevGroups[prevPos].time || 0).getTime();
      const createdAtMiliseconds = new Date(createdAt).getTime();
      const diff = createdAtMiliseconds - timeMiliseconds;

      if (
        diff < MILISECONDS_DIFF &&
        sender?.id === prevGroups[prevPos]?.senderId
      ) {
        // within period, add message to group
        prevGroups[prevPos].time = createdAt;
        prevGroups[prevPos]?.messages?.push(message?.body?.content || "");
      } else {
        // out of period, add new group
        prevGroups.push({
          avatar: sender?.avatar?.link,
          senderId: sender?.id,
          name: sender?.userName,
          time: message?.createdAt,
          messages: [message?.body?.content || ""],
        });
      }

      return prevGroups;
    },
    []
  );

  return results;
};

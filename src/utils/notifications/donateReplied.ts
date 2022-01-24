import { TDonateRepliedPayload, TNotification } from "types/notifications";

export const getMessage = (notif: TNotification) => {
  const payload = notif.payload as TDonateRepliedPayload;
  if (payload.donateReplyMessage) {
    return `Replied on your donate with message: ${payload.donateReplyMessage}`;
  } else {
    return `New response on your donate`;
  }
};

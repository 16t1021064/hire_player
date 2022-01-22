import { TNotification, TReviewUserRatedPayload } from "types/notifications";

export const getMessage = (notif: TNotification) => {
  const payload: TReviewUserRatedPayload =
    notif.payload as TReviewUserRatedPayload;
  if (notif.customer?.userName) {
    return `You received ${payload.starPoint} stars from ${notif.customer.userName}`;
  } else {
    return `You received ${payload.starPoint} stars`;
  }
};

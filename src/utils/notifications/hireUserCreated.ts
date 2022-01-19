import { THireUserCreatedPayload, TNotification } from "types/notifications";

export const getMessage = (notif: TNotification) => {
  const payload = notif.payload as THireUserCreatedPayload;
  if (notif.customer?.userName && payload.timeRent) {
    return `You receive a hire from ${notif.customer.userName} for ${payload.timeRent} hours`;
  } else {
    return `You receive a hire`;
  }
};

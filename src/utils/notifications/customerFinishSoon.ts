import { TNotification } from "types/notifications";

export const getMessage = (notif: TNotification) => {
  if (notif.customer?.userName) {
    return `User ${notif.customer.userName} has finished hire`;
  } else {
    return `User has finished hire`;
  }
};

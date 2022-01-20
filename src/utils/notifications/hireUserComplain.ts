import { TNotification } from "types/notifications";

export const getMessage = (notif: TNotification) => {
  if (notif.customer?.userName) {
    return `User ${notif.customer.userName} has complained hire`;
  } else {
    return `User has complained hire`;
  }
};

import { TNotification } from "types/notifications";

export const getMessage = (notif: TNotification) => {
  if (notif.customer?.userName) {
    return `User ${notif.customer.userName} has canceled hire`;
  } else {
    return `User has canceled hire`;
  }
};

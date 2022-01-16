import { THire, TUser } from "types";
import { TNotification, TNotificationPayload } from "types/notifications";

export const getMessage = (notif: TNotification) => {
  const payload = notif.payload as TNotificationPayload;
  const hire: THire = payload?.hire as THire;
  const customer: TUser = notif?.customer as TUser;
  if (customer?.userName && hire?.timeRent) {
    return `You receive a hire from ${customer.userName} for ${hire.timeRent} hours`;
  } else {
    return `You receive a hire`;
  }
};

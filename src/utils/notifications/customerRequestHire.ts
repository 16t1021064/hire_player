import { TNotificationRenderItem } from "components/Header/Notifications";
import { THire, TNotification, TNotificationPayload, TUser } from "types";
import notify from "utils/notify";
import Thumb from "assets/images/default-avatar.jpg";

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

export const show = (notif: TNotification) => {
  notify(
    {
      message: getMessage(notif),
    },
    "info"
  );
};

export const getRenderData = (
  notif: TNotification
): TNotificationRenderItem => {
  const content = getMessage(notif);
  const customer: TUser = notif?.customer as TUser;
  const thumb = customer?.avatar?.link || Thumb;
  const title = customer?.userName || "";
  return {
    title,
    content,
    thumb,
    time: notif.createdAt || "",
  };
};

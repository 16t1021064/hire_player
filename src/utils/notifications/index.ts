import { TNotificationRenderItem } from "components/Header/Notifications";
import { TNotification } from "types";
import * as hireRequest from "utils/notifications/hireRequest";

export const getMessage = (notif: TNotification) => {
  switch (notif.action) {
    case 1:
      return hireRequest.getMessage(notif);
    default:
      return undefined;
  }
};

export const getRenderData = (
  notif: TNotification
): TNotificationRenderItem | undefined => {
  switch (notif.action) {
    case 1:
      return hireRequest.getRenderData(notif);
    default:
      return undefined;
  }
};

export const showNotification = (notif: TNotification) => {
  switch (notif.action) {
    case 1:
      hireRequest.show(notif);
      break;
    default:
      break;
  }
};

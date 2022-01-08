import { TNotificationRenderItem } from "components/Header/Notifications";
import { TNotification } from "types";
import * as hireRequest from "utils/notifications/hireRequest";
import * as playerCancel from "utils/notifications/playerCancel";

export enum actionsEnum {
  CUSTOMER_REQUEST_HIRE = 1,
  PLAYER_ACCEPT_HIRE = 2,
  PLAYER_CANCEL_HIRE = 3,
  CUSTOMER_CANCEL_HIRE = 4,
  CUSTOMER_FINISH_SOON = 5,
  CUSTOMER_REQUEST_COMPLAIN = 6,
  COMPLETE = 7,
}

export const getMessage = (notif: TNotification) => {
  switch (notif.action) {
    case actionsEnum.CUSTOMER_REQUEST_HIRE:
      return hireRequest.getMessage(notif);
    case actionsEnum.PLAYER_CANCEL_HIRE:
      return playerCancel.getMessage(notif);
    default:
      return undefined;
  }
};

export const getRenderData = (
  notif: TNotification
): TNotificationRenderItem | undefined => {
  switch (notif.action) {
    case actionsEnum.CUSTOMER_REQUEST_HIRE:
      return hireRequest.getRenderData(notif);
    default:
      return undefined;
  }
};

export const showNotification = (notif: TNotification) => {
  switch (notif.action) {
    case actionsEnum.CUSTOMER_REQUEST_HIRE:
      hireRequest.show(notif);
      break;
    default:
      break;
  }
};

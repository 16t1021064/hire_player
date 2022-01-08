import { TNotificationRenderItem } from "components/Header/Notifications";
import { TNotification } from "types";
import * as customerRequestHire from "utils/notifications/customerRequestHire";
import * as playerCancelHire from "utils/notifications/playerCancelHire";

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
      return customerRequestHire.getMessage(notif);
    case actionsEnum.PLAYER_CANCEL_HIRE:
      return playerCancelHire.getMessage(notif);
    default:
      return undefined;
  }
};

export const getRenderData = (
  notif: TNotification
): TNotificationRenderItem | undefined => {
  switch (notif.action) {
    case actionsEnum.CUSTOMER_REQUEST_HIRE:
      return customerRequestHire.getRenderData(notif);
    default:
      return undefined;
  }
};

export const showNotification = (notif: TNotification) => {
  switch (notif.action) {
    case actionsEnum.CUSTOMER_REQUEST_HIRE:
      customerRequestHire.show(notif);
      break;
    default:
      break;
  }
};

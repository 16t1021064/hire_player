import { NotificationActionsEnum, TNotification } from "types";
import * as customerRequestHire from "utils/notifications/customerRequestHire";
import * as playerCancelHire from "utils/notifications/playerCancelHire";
import * as playerAcceptHire from "utils/notifications/playerAcceptHire";

export const getMessage = (notif: TNotification) => {
  switch (notif.action) {
    case NotificationActionsEnum.CUSTOMER_REQUEST_HIRE:
      return customerRequestHire.getMessage(notif);
    case NotificationActionsEnum.PLAYER_ACCEPT_HIRE:
      return playerAcceptHire.getMessage(notif);
    case NotificationActionsEnum.PLAYER_CANCEL_HIRE:
      return playerCancelHire.getMessage(notif);
    default:
      return undefined;
  }
};

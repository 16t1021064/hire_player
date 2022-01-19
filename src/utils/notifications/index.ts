import * as customerRequestHire from "utils/notifications/customerRequestHire";
import * as playerCancelHire from "utils/notifications/playerCancelHire";
import * as playerAcceptHire from "utils/notifications/playerAcceptHire";
import * as customerFinishSoon from "utils/notifications/customerFinishSoon";
import * as customerCancelHire from "utils/notifications/customerCancelHire";
import { NotificationActionsEnum, TNotification } from "types/notifications";

export const getMessage = (notif: TNotification) => {
  switch (notif.action) {
    case NotificationActionsEnum.CUSTOMER_REQUEST_HIRE:
      return customerRequestHire.getMessage(notif);
    case NotificationActionsEnum.PLAYER_ACCEPT_HIRE:
      return playerAcceptHire.getMessage(notif);
    case NotificationActionsEnum.PLAYER_CANCEL_HIRE:
      return playerCancelHire.getMessage(notif);
    case NotificationActionsEnum.CUSTOMER_FINISH_SOON:
      return customerFinishSoon.getMessage(notif);
    case NotificationActionsEnum.CUSTOMER_CANCEL_HIRE:
      return customerCancelHire.getMessage(notif);
    default:
      return undefined;
  }
};

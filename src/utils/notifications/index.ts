import { TNotification } from "types";
import * as customerRequestHire from "utils/notifications/customerRequestHire";
import * as playerCancelHire from "utils/notifications/playerCancelHire";
import * as playerAcceptHire from "utils/notifications/playerAcceptHire";

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
    case actionsEnum.PLAYER_ACCEPT_HIRE:
      return playerAcceptHire.getMessage(notif);
    case actionsEnum.PLAYER_CANCEL_HIRE:
      return playerCancelHire.getMessage(notif);
    default:
      return undefined;
  }
};

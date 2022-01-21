import * as hireUserCreated from "utils/notifications/hireUserCreated";
import * as hirePlayerDenied from "utils/notifications/hirePlayerDenied";
import * as hirePlayerAccepted from "utils/notifications/hirePlayerAccepted";
import * as hireUserFinished from "utils/notifications/hireUserFinished";
import * as hireUserCanceled from "utils/notifications/hireUserCanceled";
import * as hireUserComplain from "utils/notifications/hireUserComplain";
import * as hireAdminRefunded from "utils/notifications/hireAdminRefunded";
import * as conversationAdminJoined from "utils/notifications/conversationAdminJoined";
import { NotificationActionsEnum, TNotification } from "types/notifications";

export const getMessage = (notif: TNotification) => {
  switch (notif.action) {
    case NotificationActionsEnum.HIRE_USER_CREATED:
      return hireUserCreated.getMessage(notif);
    case NotificationActionsEnum.HIRE_PLAYER_ACCEPTED:
      return hirePlayerAccepted.getMessage(notif);
    case NotificationActionsEnum.HIRE_PLAYER_DENIED:
      return hirePlayerDenied.getMessage(notif);
    case NotificationActionsEnum.HIRE_USER_FINISHED:
      return hireUserFinished.getMessage(notif);
    case NotificationActionsEnum.HIRE_USER_CANCELED:
      return hireUserCanceled.getMessage(notif);
    case NotificationActionsEnum.HIRE_USER_COMPLAIN:
      return hireUserComplain.getMessage(notif);
    case NotificationActionsEnum.HIRE_ADMIN_REFUNDED:
      return hireAdminRefunded.getMessage(notif);
    case NotificationActionsEnum.CONVERSATION_ADMIN_JOINED:
      return conversationAdminJoined.getMessage(notif);
    default:
      return undefined;
  }
};

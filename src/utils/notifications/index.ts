import * as hireUserCreated from "utils/notifications/hireUserCreated";
import * as hirePlayerDenied from "utils/notifications/hirePlayerDenied";
import * as hirePlayerAccepted from "utils/notifications/hirePlayerAccepted";
import * as hireUserFinished from "utils/notifications/hireUserFinished";
import * as hireUserCanceled from "utils/notifications/hireUserCanceled";
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
    default:
      return undefined;
  }
};

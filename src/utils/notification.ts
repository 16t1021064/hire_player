import { TNotification, TNotificationHirePayload } from "types";
import notify from "./notify";

// 1 - When customer request hire
const showHireRequest = (notif: TNotification) => {
  const payload = notif.payload as TNotificationHirePayload;
  notify(
    {
      message: `You receive a hire from ${notif.customer?.userName} for ${payload?.hire?.timeRent} hours`,
    },
    "info"
  );
};

export const showNotification = (notif: TNotification) => {
  switch (notif.action) {
    case 1:
      showHireRequest(notif);
      break;
    default:
      break;
  }
};

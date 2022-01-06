import { TNotification } from "types";
import notify from "./notify";

// 1 - When customer request hire
const showHireRequest = (notif: TNotification) => {
  notify(
    {
      message: `You receive a hire from ${notif.customer?.userName}`,
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

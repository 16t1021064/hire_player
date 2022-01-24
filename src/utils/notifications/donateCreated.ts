import { TDonateCreatedPayload, TNotification } from "types/notifications";
import { formatMoney } from "utils/format";

export const getMessage = (notif: TNotification) => {
  const payload = notif.payload as TDonateCreatedPayload;
  if (payload.donateAmount && payload.donateMessage) {
    return `You are received ${formatMoney(
      payload.donateAmount || 0
    )} with message: ${payload.donateMessage}`;
  } else {
    return `You received new donate`;
  }
};

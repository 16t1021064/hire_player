import { TNotification } from "types/notifications";

export const getMessage = (notif: TNotification) => {
  if (notif.player?.playerInfo?.playerName) {
    return `Player ${notif.player.playerInfo.playerName} has accepted your request`;
  } else {
    return `Player has accepted your request`;
  }
};

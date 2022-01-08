import { TNotification, TUser } from "types";

export const getMessage = (notif: TNotification) => {
  const player: TUser = notif?.player as TUser;
  if (player?.playerInfo?.playerName) {
    return `Player ${player.playerInfo.playerName} has accepted your request`;
  } else {
    return `Player cancel your request`;
  }
};

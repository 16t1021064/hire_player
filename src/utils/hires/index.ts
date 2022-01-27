import { HireStepsEnum, THire } from "types";

export const getStepData = (
  hire: THire
): {
  color: "blue" | "green" | "yellow" | "red";
  text: string;
} => {
  switch (hire.hireStep) {
    case HireStepsEnum.USER_CREATED:
      return {
        text: "Created",
        color: "blue",
      };
    case HireStepsEnum.PLAYER_ACCEPTED:
      return {
        text: "Accepted",
        color: "green",
      };
    case HireStepsEnum.PLAYER_DENIED:
      return {
        text: "Denied",
        color: "yellow",
      };
    case HireStepsEnum.USER_CANCELED:
      return {
        text: "Cancelled",
        color: "yellow",
      };
    case HireStepsEnum.HIRE_COMPLETED:
      return {
        text: "Completed",
        color: "green",
      };
    case HireStepsEnum.USER_COMPLAINED:
      return {
        text: "Complained",
        color: "red",
      };
    case HireStepsEnum.ADMIN_REFUNDED:
      return {
        text: "Refunded",
        color: "yellow",
      };
    default:
      return {
        text: "Unknown",
        color: "blue",
      };
  }
};

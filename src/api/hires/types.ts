import { TConversation, THire } from "types";

export interface TCreateHireRequest {
  playerId: string;
  timeRent: number;
  cost: number;
  customerNote: string;
}

export interface TCreateHireResponse {
  data: {
    hire: THire;
    conversation: TConversation;
  };
  message: "CREATE_CONVERSATION_SUCCESS";
}

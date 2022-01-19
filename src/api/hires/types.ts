import { TConversation, THire } from "types";

export interface TCreateHireRequest {
  playerId: string;
  timeRent: number;
  customerNote: string;
}

export interface TCreateHireResponse {
  data: {
    hire: THire;
    conversation: TConversation;
  };
  message: "CREATE_CONVERSATION_SUCCESS";
}

export interface TGetHireRequest {
  id: string;
}

export interface TGetHireResponse {
  data: THire;
  message: "GET_DETAIL_HIRE_SUCCESS";
}

export interface TUserFinishRequest {
  id: string;
}

export interface TUserFinishResponse {
  data: THire;
  message: "FINISH_SOON_HIRE_SUCCESS";
}

export interface TPlayerAcceptHireRequest {
  id: string; // hire id
}

export interface TPlayerAcceptHireResponse {
  data: THire;
  message: "ACCEPT_HIRE_SUCCESS";
}

export interface TPlayerCancelHireRequest {
  id: string; // hire id
  cancelReason: string;
}

export interface TPlayerCancelHireResponse {
  data: THire;
  message: "CANCEL_HIRE_SUCCESS";
}

export interface TUserComplainRequest {
  id: string;
}

export interface TUserComplainResponse {
  data: THire;
  message: "REQUEST_COMPLAIN_SUCCESS";
}

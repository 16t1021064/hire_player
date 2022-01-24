import { TPaginationRequest, TPaginationResponse } from "api/types";
import { TDonate } from "types";

export interface TCreateDonateRequest {
  amount: number;
  message: string;
  toUser: string;
}

export interface TCreateDonateResponse {
  message: "CREATE_DONATE_SUCCESS";
}

export type TGetReceivedDonatesRequest = TPaginationRequest;

export interface TGetReceivedDonatesResponse {
  data: TPaginationResponse & {
    results: TDonate[];
  };
  message: "GET_RECEIVE_DONATES_SUCCESS";
}

export type TGetSentDonatesRequest = TPaginationRequest;

export interface TGetSentDonatesResponse {
  data: TPaginationResponse & {
    results: TDonate[];
  };
  message: "GET_DONATES_SUCCESS";
}

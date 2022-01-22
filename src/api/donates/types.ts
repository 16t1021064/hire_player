export interface TCreateDonateRequest {
  amount: number;
  message: string;
  toUser: string;
}

export interface TCreateDonateResponse {
  message: "CREATE_DONATE_SUCCESS";
}

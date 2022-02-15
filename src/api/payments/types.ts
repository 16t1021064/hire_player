import { TPaymentSetting } from "types";

export interface TGetPaymentSettingResponse {
  data: TPaymentSetting;
  message: "GET_DETAIL_PAYMENT_SETTING_SUCCESS";
}

export interface TUpdatePaymentMethodRequest {
  paymentMethodId: string;
}

export interface TUpdatePaymentMethodResponse {
  data: TPaymentSetting;
  message: "CREATE_PAYMENT_SETTING_CREDIT_CARD_SUCCESS";
}

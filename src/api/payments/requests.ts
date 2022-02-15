import axiosInstance from "api/axios";
import {
  TGetPaymentSettingResponse,
  TUpdatePaymentMethodRequest,
  TUpdatePaymentMethodResponse,
} from "./types";

export const getPaymentSettingRequest =
  async (): Promise<TGetPaymentSettingResponse> => {
    const { data } = await axiosInstance.get(`/users/payment-settings`);
    return data;
  };

export const updatePaymentMethodRequest = async (
  request: TUpdatePaymentMethodRequest
): Promise<TUpdatePaymentMethodResponse> => {
  const { data } = await axiosInstance.put(
    `/users/payment-settings/credit-card`,
    request
  );
  return data;
};

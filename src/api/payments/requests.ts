import axiosInstance from "api/axios";
import {
  TGetPaymentSettingResponse,
  TRechargeByCreditCardRequest,
  TRechargeByCreditCardResponse,
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

export const rechargeByCreditCardRequest = async (
  request: TRechargeByCreditCardRequest
): Promise<TRechargeByCreditCardResponse> => {
  const { data } = await axiosInstance.post(`/recharges/credit-card`, request);
  return data;
};

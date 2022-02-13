import axiosInstance from "api/axios";
import { TGetPaymentSettingResponse } from "api/users/types";

export const getPaymentSettingRequest =
  async (): Promise<TGetPaymentSettingResponse> => {
    const { data } = await axiosInstance.get(`/users/payment-settings`);
    return data;
  };

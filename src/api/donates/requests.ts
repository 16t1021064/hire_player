import axiosInstance from "api/axios";
import { TCreateDonateRequest, TCreateDonateResponse } from "./types";

export const createDonateRequest = async (
  request: TCreateDonateRequest
): Promise<TCreateDonateResponse> => {
  const { data } = await axiosInstance.post(`/donates`, request);
  return data;
};

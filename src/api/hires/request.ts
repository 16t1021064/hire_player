import axiosInstance from "../axios";
import { TCreateHireRequest, TCreateHireResponse } from "./types";

export const createHireRequest = async (
  request: TCreateHireRequest
): Promise<TCreateHireResponse> => {
  const { data } = await axiosInstance.post(`/hires`, request);
  return data;
};

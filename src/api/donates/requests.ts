import axiosInstance from "api/axios";
import {
  TCreateDonateRequest,
  TCreateDonateResponse,
  TGetReceivedDonatesRequest,
  TGetReceivedDonatesResponse,
  TGetSentDonatesRequest,
  TGetSentDonatesResponse,
} from "./types";

export const createDonateRequest = async (
  request: TCreateDonateRequest
): Promise<TCreateDonateResponse> => {
  const { data } = await axiosInstance.post(`/donates`, request);
  return data;
};

export const getReceivedDonatesRequest = async (
  request: TGetReceivedDonatesRequest
): Promise<TGetReceivedDonatesResponse> => {
  const { data } = await axiosInstance.get(`/donates/receive`, {
    params: request,
  });
  return data;
};

export const getSentDonatesRequest = async (
  request: TGetSentDonatesRequest
): Promise<TGetSentDonatesResponse> => {
  const { data } = await axiosInstance.get(`/donates`, {
    params: request,
  });
  return data;
};

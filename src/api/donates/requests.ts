import axiosInstance from "api/axios";
import {
  TCreateDonateRequest,
  TCreateDonateResponse,
  TGetReceivedDonatesRequest,
  TGetReceivedDonatesResponse,
  TGetSentDonatesRequest,
  TGetSentDonatesResponse,
  TReplyDonateRequest,
  TReplyDonateResponse,
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

export const replyDonateRequest = async (
  request: TReplyDonateRequest
): Promise<TReplyDonateResponse> => {
  const { data } = await axiosInstance.post(
    `/donates/${request.id}/reply`,
    request
  );
  return data;
};

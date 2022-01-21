import axiosInstance from "../axios";
import {
  TCreateReviewRequest,
  TCreateReviewResponse,
  TGetReviewsRequest,
  TGetReviewsResponse,
} from "./types";

export const getReviewsRequest = async (
  request: TGetReviewsRequest
): Promise<TGetReviewsResponse> => {
  const { data } = await axiosInstance.get(`/reviews`, {
    params: request,
  });
  return data;
};

export const createReviewRequest = async (
  request: TCreateReviewRequest
): Promise<TCreateReviewResponse> => {
  const { data } = await axiosInstance.put(
    `/hires/${request.id}/reviews`,
    request
  );
  return data;
};

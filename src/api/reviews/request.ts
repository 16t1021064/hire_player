import axiosInstance from "../axios";
import { TGetReviewsRequest, TGetReviewsResponse } from "./types";

export const getReviewsRequest = async (
  request: TGetReviewsRequest
): Promise<TGetReviewsResponse> => {
  const { data } = await axiosInstance.get(`/reviews`, {
    params: request,
  });
  return data;
};

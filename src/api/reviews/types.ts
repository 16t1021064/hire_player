import { TReview, TReviewStatuses } from "types";

export interface TGetReviewsRequest {
  reviewerId?: string;
  receiverId?: string;
  status?: TReviewStatuses;
  starPoint?: number;
  sortBy?: string;
  limit?: number;
  page?: number;
  populate?: string;
}

export interface TGetReviewsResponse {
  data: {
    results: TReview[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
  message: "GET_REVIEWS_SUCCESS";
}

export interface TSuccessResponse {
  code: number;
}

export interface TError {
  code: number;
  msg: string;
  msg_code: string;
  message?: string;
}

export interface TPaginationRequest {
  sortBy?: string;
  limit?: number;
  page?: number;
  populate?: string;
}

export interface TPaginationResponse {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

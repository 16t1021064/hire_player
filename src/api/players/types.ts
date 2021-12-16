import { TPlayerInfo, TPlayerType } from "types";

export interface TGetPlayersRequest {
  userId?: string;
  status?: 1 | 2; // 1: Active, 2: Inactive
  typePlayer?: TPlayerType;
  sortBy?: string;
  limit?: number;
  page?: number;
  populate?: string;
}

export interface TGetPlayersResponse {
  data: {
    results: TPlayerInfo[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
  message: "GET_PLAYER_INFO_SUCCESS";
}

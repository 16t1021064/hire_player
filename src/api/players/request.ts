import axiosInstance from "../axios";
import { TGetPlayersRequest, TGetPlayersResponse } from "./types";

export const getPlayersRequest = async (
  request: TGetPlayersRequest
): Promise<TGetPlayersResponse> => {
  const { data } = await axiosInstance.get(`/players`, {
    params: request,
  });
  return data;
};

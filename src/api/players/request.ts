import axiosInstance from "../axios";
import {
  TGetPlayerResponse,
  TGetPlayersRequest,
  TGetPlayersResponse,
} from "./types";

export const getPlayersRequest = async (
  request: TGetPlayersRequest
): Promise<TGetPlayersResponse> => {
  const { data } = await axiosInstance.get(`/players`, {
    params: request,
  });
  return data;
};

export const getPlayerRequest = async (
  playerId: string
): Promise<TGetPlayerResponse> => {
  const { data } = await axiosInstance.get(`/players/${playerId}`);
  return data;
};

import { useEffect, useState } from "react";
import { getAccessToken } from "utils/auth";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "./useRedux";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [connected, setConnected] = useState<boolean>(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const { isLogin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!process.env?.REACT_APP_SOCKET_URL || !accessToken || !isLogin) {
      if (socket && socket.connected) {
        socket.disconnect();
      }
      return;
    }

    const soc = io(process.env.REACT_APP_SOCKET_URL, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    soc.on("connect", () => {
      setId(soc.id);
      setConnected(soc.connected);
    });

    soc.on("disconnect", () => {
      setId(soc.id);
      setConnected(soc.connected);
    });

    setSocket(soc);

    return () => {
      if (socket) {
        setSocket(undefined);
        socket.close();
      }
    };
  }, [isLogin]);

  return { socket, connected, id };
};

export default useSocket;

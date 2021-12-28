import { useEffect, useState } from "react";
import { getAccessToken } from "utils/auth";
// import WebSocket from "ws";

const useWebSocket = ({
  socketUrl = "",
  retry: defaultRetry = 3,
  retryInterval = 1500,
}) => {
  const [data, setData] = useState<any>();
  const [send, setSend] = useState<Function>(() => () => undefined);
  const [retry, setRetry] = useState<any>(defaultRetry);
  const [readyState, setReadyState] = useState(false);

  useEffect(() => {
    const accessToken = getAccessToken();
    // const options: WebSocket.ClientOptions = {};
    // if (accessToken) {
    //   options.headers = {
    //     Authorization: `Bearer ${accessToken}`,
    //   };
    // }

    const ws = new WebSocket(socketUrl);
    ws.onopen = () => {
      setReadyState(true);

      setSend(() => {
        return (data: any) => {
          try {
            const d = JSON.stringify(data);
            ws.send(d);
            return true;
          } catch (err) {
            return false;
          }
        };
      });

      ws.onmessage = (event) => {
        const msg: any = formatMessage(event.data);
        setData({ message: msg, timestamp: getTimestamp() });
      };
    };

    ws.onclose = () => {
      setReadyState(false);
      if (retry > 0) {
        setTimeout(() => {
          setRetry((retry: any) => retry - 1);
        }, retryInterval);
      }
    };

    return () => {
      ws.close();
    };
  }, [retry]);

  return { send, data, readyState };
};

const formatMessage = (data: any): any => {
  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (err) {
    return data;
  }
};

const getTimestamp = () => {
  return new Date().getTime();
};

export default useWebSocket;

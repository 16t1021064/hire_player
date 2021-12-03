import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import i18n from "i18next";
import { routesEnum } from "pages/Routes";
import { getToken } from "utils/auth";

const defaultErrorCode = "error:e_ERROR";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

const handleSuccess = (res: AxiosResponse) => {
  // if (res.data?.code !== 0) {
  //   const errorCode = `error:${res.data.msg_code}`;
  //   if (typeof res.data !== "object") {
  //     res.data = { message: i18n.t(defaultErrorCode) };
  //   } else {
  //     res.data.message = i18n.exists(errorCode)
  //       ? i18n.t(errorCode)
  //       : i18n.t(defaultErrorCode);
  //   }
  //   return Promise.reject(res.data);
  // }
  return res;
};

const handleError = (err: AxiosError) => {
  if (err.response?.status === 401) {
    window.location.href = routesEnum.logout;
  }
  const data = err?.response?.data;
  const errorCode = `error:${data?.msg_code}`;
  data.message = i18n.exists(errorCode)
    ? i18n.t(errorCode)
    : i18n.t(defaultErrorCode);
  return Promise.reject(data);
};

axiosInstance.interceptors.response.use(handleSuccess, handleError);

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    let token = getToken();
    if (token) {
      config = {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
        data: convertToFormData(config.data),
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const convertToFormData = (data: { string: string }) => {
  const bodyFormData = new FormData();
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      bodyFormData.append(key, value);
    }
  }
  return bodyFormData;
};

export default axiosInstance;

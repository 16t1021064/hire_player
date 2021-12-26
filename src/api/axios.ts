import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import i18n from "i18next";
import { routesEnum } from "pages/Routes";
import { getAccessToken } from "utils/auth";
import { notifyDanger } from "utils/notify";

const defaultErrorCode = "error:ERROR_SYSTEM";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

const handleSuccess = (res: AxiosResponse) => {
  return res;
};

const handleError = (err: AxiosError) => {
  if (err.response?.status === 401) {
    window.location.href = routesEnum.logout;
  }
  const data = err?.response?.data;
  if (data?.errors) {
    const messages = [];
    let hasSystemError = false;
    data.errors.forEach((error: any) => {
      let errorCode = `error:${error}`;
      if ((data.message = i18n.exists(errorCode))) {
        messages.push(i18n.t(errorCode));
      } else {
        hasSystemError = true;
      }
    });
    if (messages.length === 0 && hasSystemError) {
      messages.push(i18n.t(defaultErrorCode));
    }

    messages.forEach((message: any) => {
      notifyDanger(message);
    });
  }
  return Promise.reject(data);
};

axiosInstance.interceptors.response.use(handleSuccess, handleError);

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    let token = getAccessToken();
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

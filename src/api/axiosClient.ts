import axios, {
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { IServerResponse } from "../models";
import verifyToken from "../utils/verifyToken";
import userApi from "./userApi";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    //Do something before request is sent
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return config;
    }
    const checkedToken = verifyToken(token as string);
    if (checkedToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    } else {
      try {
        const response: IServerResponse = await userApi.refresh();
        if (response.data) {
          localStorage.setItem("at", response.data);
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${response.data}`,
          } as AxiosRequestHeaders;
        }
      } catch (error: any) {
        localStorage.removeItem("at");
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;

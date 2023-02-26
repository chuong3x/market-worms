import { LoginPayload } from "../components/LoginForm";
import { IServerResponse } from "../models";
import axiosClient from "./axiosClient";

const userApi = {
  login(payload: LoginPayload): Promise<IServerResponse> {
    const url = "/api/auth/login";
    return axiosClient.post(url, payload);
  },
  logout(): Promise<IServerResponse> {
    const url = "/api/auth/logout";
    return axiosClient.post(url);
  },
  refresh(): Promise<IServerResponse> {
    const url = "/api/auth/rf";
    return axiosClient.post(url);
  },
};

export default userApi;

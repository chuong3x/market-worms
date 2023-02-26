import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IServerResponse } from "../models";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/`,
  }),
  endpoints: (build) => ({
    refresh: build.mutation<IServerResponse, void>({
      query: () => ({
        url: `rf`,
        method: "POST",
      }),
    }),
  }),
});

export const { useRefreshMutation } = authApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { IResponse, ISetting } from "../models";
import baseQueryWithReauth from "./rtk.client";

//Interfaces
interface SettingResponse extends IResponse {
  data: ISetting;
}
//Create Api
export const settingApi = createApi({
  reducerPath: "settingApi",
  tagTypes: ["Setting"],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getSetting: build.query<SettingResponse, void>({
      query: () => `setting`,
      providesTags: ["Setting"],
    }),
    setSetting: build.mutation<SettingResponse, ISetting>({
      query: (payload) => ({
        url: `setting`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

//Export

export const { useGetSettingQuery, useSetSettingMutation } = settingApi;

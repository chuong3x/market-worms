import { createApi } from "@reduxjs/toolkit/query/react";
import { IResponse } from "../models";
import baseQueryWithReauth from "./rtk.client";

//Interfaces
interface TradingResponse extends IResponse {
  data: boolean;
}
//Create Api
export const tradeApi = createApi({
  reducerPath: "tradingApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Trade"],
  endpoints: (build) => ({
    getTrading: build.query<TradingResponse, void>({
      query: () => `bot`,
      providesTags: ["Trade"],
    }),
    trade: build.mutation<TradingResponse, void>({
      query: () => ({
        url: `bot`,
        method: "POST",
      }),
      invalidatesTags: ["Trade"],
    }),
    stopTrade: build.mutation<TradingResponse, void>({
      query: () => ({
        url: `bot`,
        method: "PUT",
      }),
      invalidatesTags: ["Trade"],
    }),
  }),
});

//Export

export const { useGetTradingQuery, useTradeMutation, useStopTradeMutation } =
  tradeApi;

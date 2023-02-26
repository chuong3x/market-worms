import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "../models";

//Interfaces
export interface GetDataPayload {
  symbol: string;
}
interface SymbolsResonse extends IResponse {
  data: string[];
}

//Create Api
export const symbolsApi = createApi({
  reducerPath: "symbolsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/`,
  }),
  endpoints: (build) => ({
    getSymbols: build.query<SymbolsResonse, void>({
      query: () => `symbols`,
    }),
  }),
});

//Export

export const { useGetSymbolsQuery } = symbolsApi;

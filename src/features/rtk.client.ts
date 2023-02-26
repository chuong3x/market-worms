import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { authActions } from "./auth.slice";
import { IServerResponse } from "../models";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api/",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("at");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery("/auth/rf", api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      api.dispatch(authActions.setToken(refreshResult.data as IServerResponse));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(authActions.logout());
    }
  }
  return result;
};
export default baseQueryWithReauth;

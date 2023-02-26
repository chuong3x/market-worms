import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IResponse, FuturesAccountInfoResult } from "../models";

interface AccountState {
  isLoading: boolean;
  message: string;
  account: FuturesAccountInfoResult;
}

export interface AccountResponse extends IResponse {
  data: FuturesAccountInfoResult;
}
const initialState: AccountState = {
  isLoading: false,
  message: "",
  account: {} as FuturesAccountInfoResult,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    getAccount: (state) => {
      return;
    },
    setAccount: (state, action: PayloadAction<AccountResponse>) => {
      state.account = action.payload.data;
    },
    getAccountFail: (state, action: PayloadAction<AccountResponse>) => {
      state.message = action.payload.message;
    },
  },
});

export const { getAccount, setAccount, getAccountFail } = accountSlice.actions;
export const accountSelector = (state: RootState) => state.account;

const accountReducer = accountSlice.reducer;
export default accountReducer;

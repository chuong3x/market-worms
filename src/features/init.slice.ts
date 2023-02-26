import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface InitSliceState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
}
const initialState: InitSliceState = {
  isEstablishingConnection: false,
  isConnected: false,
};
const initSlice = createSlice({
  name: "init",
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = false;
    },
  },
});

export const initActions = initSlice.actions;

export const selectIsEstablishingConnection = (state: RootState) =>
  state.init.isEstablishingConnection;
export const selectIsConnected = (state: RootState) => state.init.isConnected;

const initReducer = initSlice.reducer;
export default initReducer;

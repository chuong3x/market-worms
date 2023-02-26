import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import userApi from "../api/userApi";
import { AppDispatch, RootState } from "../app/store";
import { LoginPayload } from "../components/LoginForm";
import { IServerResponse } from "../models";
interface AuthState {
  isLogged: boolean;
  isLogging: boolean;
  isLoggingOut: boolean;
  message: string;
}
const initialState: AuthState = {
  isLogged: Boolean(localStorage.getItem("at")),
  isLogging: false,
  isLoggingOut: false,
  message: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logging: (state) => {
      state.isLogging = true;
    },
    loginSuccess: (state, action: PayloadAction<IServerResponse>) => {
      state.isLogging = false;
      state.message = action.payload.message;
      localStorage.setItem("at", action.payload.data);
      state.isLogged = true;
    },
    loginFail: (state, action: PayloadAction<IServerResponse>) => {
      state.isLogging = action.payload.data;
      state.message = action.payload.message;
    },
    logout: (state) => {
      state.isLoggingOut = true;
    },
    logoutSuccess: (state, action: PayloadAction<IServerResponse>) => {
      state.isLoggingOut = false;
      state.message = action.payload.message;
      localStorage.removeItem("at");
      state.isLogged = false;
    },
    logoutFail: (state, action: PayloadAction<IServerResponse>) => {
      state.isLoggingOut = false;
      state.message = action.payload.message;
    },
    setToken: (state, action: PayloadAction<IServerResponse>) => {
      localStorage.setItem("at", action.payload.data);
    },
  },
});

export const authActions = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
const authReducer = authSlice.reducer;
export default authReducer;

export const loginAsync =
  (payload: LoginPayload) => async (dispatch: AppDispatch) => {
    dispatch(authActions.logging);
    try {
      const loginResult = await userApi.login(payload);
      dispatch(authActions.loginSuccess(loginResult));
    } catch (error: any) {
      dispatch(
        authActions.loginFail({
          message: error.response.data.message,
          data: false,
        })
      );
    }
  };
export const logoutAsync = () => async (dispatch: AppDispatch) => {
  dispatch(authActions.logout);
  try {
    const logoutResult = await userApi.logout();
    dispatch(authActions.logoutSuccess(logoutResult));
  } catch (error: any) {
    dispatch(
      authActions.logoutFail({
        message: error.response.data.message,
        data: false,
      })
    );
  }
};

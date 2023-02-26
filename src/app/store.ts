import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/account.slice";
import { authApi } from "../features/auth.api";
import authReducer from "../features/auth.slice";

import initReducer from "../features/init.slice";
import { settingApi } from "../features/setting.api";
import { symbolsApi } from "../features/symbol.api";
import { tradeApi } from "../features/trade.api";
import commonMiddleware from "../middlewares/commonMiddleware";

export const store = configureStore({
    reducer: {
        init: initReducer,
        auth: authReducer,
        account: accountReducer,
        [symbolsApi.reducerPath]: symbolsApi.reducer,
        [tradeApi.reducerPath]: tradeApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [settingApi.reducerPath]: settingApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            symbolsApi.middleware,
            tradeApi.middleware,
            authApi.middleware,
            settingApi.middleware,
            commonMiddleware
        ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

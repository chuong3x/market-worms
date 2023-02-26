import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";

import { initActions } from "../features/init.slice";
import {
    getAccount,
    getAccountFail,
    setAccount,
} from "../features/account.slice";

const commonMiddleware: Middleware = (store) => {
    let socket: Socket;
    return (next) => async (action) => {
        const isSocketEstablished = socket && store.getState().init.isConnected;
        if (initActions.startConnecting.match(action)) {
            socket = io(process.env.REACT_APP_API_URL, {
                withCredentials: true,
                transports: ["websocket"],
            });
            socket.on("connect", () => {
                console.log("Connected socket");
                store.dispatch(initActions.connectionEstablished());
            });
        }
        //Socket action listener
        if (isSocketEstablished) {
            socket.on("account", (data) => {
                if (data.data) {
                    store.dispatch(setAccount(data));
                } else {
                    store.dispatch(getAccountFail(data));
                }
            });

            if (getAccount.match(action)) {
                socket.emit("account");
            }
        }

        next(action);
    };
};

export default commonMiddleware;

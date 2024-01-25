import { configureStore } from "@reduxjs/toolkit";
import loginModalReducer from "./reducers/loginModalReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        loginModal: loginModalReducer
    },
});

export default store;
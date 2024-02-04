import { configureStore } from "@reduxjs/toolkit";
import loginModalReducer from "./reducers/loginModalReducer";
import userReducer from "./reducers/userReducer";
import verticalsReducer from "./reducers/verticalsReducer";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        loginModal: loginModalReducer,
        verticals: verticalsReducer,
        cart: cartReducer
    },
});

export default store;
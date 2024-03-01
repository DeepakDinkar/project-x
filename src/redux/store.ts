import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import loginModalReducer from "./reducers/loginModalReducer";
import secretStoreReducer from "./reducers/secretStoreReducer";
import userReducer from "./reducers/userReducer";
import verticalsReducer from "./reducers/verticalsReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    loginModal: loginModalReducer,
    verticals: verticalsReducer,
    cart: cartReducer,
    secretStore: secretStoreReducer,
  },
});

export default store;

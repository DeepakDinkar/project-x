import { createSlice } from "@reduxjs/toolkit";
import { SessionStorageUtils } from "../../utils/SessionStorageUtils";

const AUTH = "auth";

const getAuthDetails = () => {
  return SessionStorageUtils.getParseItem(AUTH);
};

const initialState = {
  userName: null,
  login: false,
  authToken: null,
};

const getInitialState = () => {
  const authDetails = getAuthDetails();
  if (authDetails) {
    initialState.authToken = authDetails.token;
    initialState.userName = authDetails.userName;
    initialState.login = authDetails.login;
  }

  return initialState;
};

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    login: (state, action) => {
      const { payload } = action;

      state.login = true;
      state.userName = payload.userName;
      state.authToken = payload.token;

      SessionStorageUtils.setParsedItem(AUTH, state);
    },
    logout: (state) => {
      state.login = false;
      state.userName = null;
      state.authToken = null;

      SessionStorageUtils.removeItem(AUTH);
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

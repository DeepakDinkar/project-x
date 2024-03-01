import { createSlice } from "@reduxjs/toolkit";
import { SessionStorageUtils } from "../../utils/SessionStorageUtils";

const initialState = {
  secretKey: null,
  json: null,
};

const SECRET_KEY = "secretKey";

const secreteStoreReducer = createSlice({
  name: "secretStore",
  initialState,
  reducers: {
    storeSecretKey: (state, action) => {
      state.secretKey = action.payload;
      SessionStorageUtils.setItem(SECRET_KEY, state.secretKey ?? "");
    }
  },
});

export const { storeSecretKey } = secreteStoreReducer.actions;

export default secreteStoreReducer.reducer;

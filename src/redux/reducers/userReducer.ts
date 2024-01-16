import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state) => {
            state.login = true;
        },
        logout: (state) => {
            state.login = false;
        }
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
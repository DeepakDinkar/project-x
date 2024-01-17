import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: false,
    userName: 'John Doe',
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.login = true;
            state.userName = action.payload.userName;

        },
        logout: (state) => {
            state.login = false;
            state.userName = '';
        }
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
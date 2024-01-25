import { createSlice } from "@reduxjs/toolkit";
import LoginModalReducerProps from "../../models/reducers/LoginModalReducerProps";

const initialState: LoginModalReducerProps = {
    isModalOpen: false,
};

const loginModalSlice = createSlice({
    name: "loginModal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true;

        },
        closeModal: (state) => {
            state.isModalOpen = false;
        }
    },
});

export const { openModal, closeModal } = loginModalSlice.actions;

export default loginModalSlice.reducer;
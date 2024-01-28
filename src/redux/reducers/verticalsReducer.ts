import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    verticals: []
};

const verticalSlice = createSlice({
    name: "vertical",
    initialState,
    reducers: {
        setVerticals: (state, action) => {
            state.verticals = action.payload;

        }
    },
});

export const { setVerticals } = verticalSlice.actions;

export default verticalSlice.reducer;
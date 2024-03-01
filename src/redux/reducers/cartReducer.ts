import { createSlice } from "@reduxjs/toolkit";
import { Course } from "../../models/Course";

const initialState: { items: Course[]; isDrawerVisible: boolean } = {
  items: [],
  isDrawerVisible: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartItems: (state, action) => {
      state.items = action.payload;
    },
    openCartDrawer: (state) => {
      state.isDrawerVisible = true;
    },
    closeCartDrawer: (state) => {
      state.isDrawerVisible = false;
    },
  },
});

export const { updateCartItems, openCartDrawer, closeCartDrawer } =
  cartSlice.actions;

export default cartSlice.reducer;

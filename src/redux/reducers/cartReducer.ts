import { createSlice } from "@reduxjs/toolkit";
import { Course } from "../../models/Course";
import { SessionStorageUtils } from "../../utils/SessionStorageUtils";
import { message } from "antd";

const CART_KEY = "CART";

const getInitialItems = () => {
  const items = SessionStorageUtils.getParseItem(CART_KEY);
  return items ?? [];
}

const initialState: { items: Course[], isDrawerVisible: boolean } = {
  items: getInitialItems(),
  isDrawerVisible: false
};

const getItemIndex = (items: Course[], id: number) => {
  return items.findIndex(item => item.id == id);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {

      const { id } = action.payload;
      if(getItemIndex(state.items, id) > -1) {
        message.warning("Course already added to cart");
      } else {
        state.items = [...state.items, action.payload];
        message.success("Course add to cart");
      }
      SessionStorageUtils.setParsedItem(CART_KEY, state.items);
      state.isDrawerVisible = true;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const index = getItemIndex(state.items, id);
      if (index !== -1) {
        state.items.splice(index, 1);
        SessionStorageUtils.setParsedItem(CART_KEY, state.items);
        message.success("Course removed from cart");
      }
    },
    clearCart: (state) => {
      state.items = [];
      SessionStorageUtils.clearSession();
    },
    closeCartDrawer: (state) => {
      state.isDrawerVisible = false;
    }
  },
});


export const { addToCart, removeFromCart, clearCart, closeCartDrawer } = cartSlice.actions;

export default cartSlice.reducer;

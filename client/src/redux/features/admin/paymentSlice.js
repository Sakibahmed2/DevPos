import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

export const paymentSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.product.push(action.payload);
    },
    removeProduct: (state) => {
      state.product = [];
    },
  },
});

export const { addProduct, removeProduct } = paymentSlice.actions;

export default paymentSlice.reducer;

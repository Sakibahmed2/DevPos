import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import paymentReducer from "./features/admin/paymentSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    products: paymentReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

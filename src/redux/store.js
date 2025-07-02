// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import cartReducer from "../redux/slices/cartSlice"
import productReducer from "../redux/slices/productSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
  },
});

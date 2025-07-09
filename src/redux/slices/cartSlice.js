import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;

// Load cart from backend
export const loadCartFromBackend = createAsyncThunk(
  "cart/loadCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/cart`, {
        withCredentials: true, // Include cookies for auth
      });
      return res.data.items;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load cart");
    }
  }
);

// Save cart to backend
export const saveCartToBackend = createAsyncThunk(
  "cart/saveCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const payload = state.cart.items.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      await axios.post(
        `${API_URL}/api/cart`,
        { items: payload },
        { withCredentials: true }
      );
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to save cart");
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((item) => item._id !== id);
        }
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item._id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCartFromBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCartFromBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map(({ product, quantity }) => ({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        }));
      })
      .addCase(loadCartFromBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

// Actions
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

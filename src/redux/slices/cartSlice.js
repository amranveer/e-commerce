import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  items: [], // each item: { _id, name, price, quantity, image }
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item._id === product._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item._id !== id);
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(item => item._id !== id);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Inline Selectors (use these in components)
export const selectCartItems = (state) => state.cart.items;

export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

// Export actions and reducer
export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

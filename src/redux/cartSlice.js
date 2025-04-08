import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const item = state.cart.find(item => item.id === product.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    increaseQty: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter(item => item.id !== action.payload);
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } = cartSlice.actions;

  
export default cartSlice.reducer

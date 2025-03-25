import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType } from '../types/types';

type SliceState = { cartItems: CartItemType[] };

const initialState: SliceState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') ?? '{}')
  : {
      cartItems: [],
    };

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const item = action.payload;

      const existingItem = state.cartItems.find(p => p._id === item._id);

      if (existingItem) {
        state.cartItems = state.cartItems.map(p =>
          p._id === existingItem._id ? item : p
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(p => p._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },

    resetCart: state => {
      state.cartItems = initialState.cartItems;
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType, shippingType } from '../types/types';
import { updateCart } from '../utils/cartUtils';

type SliceState = {
  cartItems: CartItemType[];
  shippingAddress: shippingType;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

const initialState: SliceState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') ?? '{}')
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: 'PayPal',
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
      updateCart(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(p => p._id !== action.payload);
      updateCart(state);
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: state => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
    resetCart: state => {
      state.cartItems = initialState.cartItems;
      state.shippingAddress = initialState.shippingAddress;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  resetCart,
  clearCartItems,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;

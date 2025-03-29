import { CartItemType } from '../types/types';

export const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

interface CartState {
  cartItems: CartItemType[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export const updateCart = (state: CartState): CartState => {
  const itemsPrice = state.cartItems.reduce(
    (acc: number, item: CartItemType) =>
      acc + (item.price * 100 * item.qty) / 100,
    0
  );
  state.itemsPrice = +addDecimals(itemsPrice);

  // Calculate the shipping price
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = +addDecimals(shippingPrice);

  // Calculate the tax price
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = +addDecimals(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // Calculate the total price
  state.totalPrice = +addDecimals(totalPrice);

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};

import { PRODUCTS_URL } from '../constants';
import { ProductType } from '../types/types';
import { apiSlice } from './apiSlice';

export const productSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductsDetails: builder.query<ProductType, string>({
      query: productId => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductsDetailsQuery } = productSlice;

// const initialState = {
//   products: [],
//   loading: false,
//   success: false,
//   error: false,
//   message: '',
// };

// export const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {},
// });

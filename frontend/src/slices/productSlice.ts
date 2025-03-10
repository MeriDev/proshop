import { PRODUCTS_URL } from '../constants';
import { productType } from '../types/types';
import { apiSlice } from './apiSlice';

export const productSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<productType[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductsDetails: builder.query<productType, string>({
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

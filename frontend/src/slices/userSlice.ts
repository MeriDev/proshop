import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: data => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        providesTags: ['User'],
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userSlice;

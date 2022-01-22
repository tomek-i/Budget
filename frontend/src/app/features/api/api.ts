import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337',
    prepareHeaders(headers) {
      const token = localStorage.getItem('accessToken');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: () => ({}),
});

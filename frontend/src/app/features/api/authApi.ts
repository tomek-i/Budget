import { baseAPI } from './api';

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query(body: any) {
        return {
          url: '/api/auth/login',
          method: 'POST',
          body,
        };
      },
    }),
    register: builder.mutation<any, any>({
      query(body: any) {
        return {
          url: '/api/auth/signup',
          method: 'POST',
          body,
        };
      },
    }),
    //TODO: should that not go to the USER api
    getUser: builder.mutation<any, any>({
      query(token: string) {
        return {
          url: '/api/users/me',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserMutation } =
  authAPI;

import { baseAPI } from '../api';

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query(body: any) {
        console.log({ login: body });
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
          url: '/auth/register',
          method: 'POST',
          body,
        };
      },
    }),
    getUser: builder.mutation<any, any>({
      query(token: string) {
        console.log({ getUser: token });
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

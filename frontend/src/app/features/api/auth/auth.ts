import { baseAPI } from '../api';

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query(body: any) {
        return {
          url: '/api/auth/local',
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

import { baseAPI } from './api';

export const userApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<any, any>({
      query(body) {
        return {
          url: '/api/users/', //TODO: this probably should be user or so
          method: 'PATCH',
          body,
        };
      },
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;

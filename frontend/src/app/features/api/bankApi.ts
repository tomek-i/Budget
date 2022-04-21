import { baseAPI } from './api';

export type BankCreateUserData = {
  email?: string;
  mobile?: string;
};

export type BankCreateUserResponse = {
  type: string;
  id: string;
  email: string;
  mobile: string;
  links: {
    self: string;
  };
};
export const bankAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createBankUser: builder.mutation<
      BankCreateUserResponse,
      BankCreateUserData
    >({
      query(body) {
        return {
          url: '/api/bank/createUser',
          method: 'POST',
          body,
        };
      },
    }),
    createBankConnection: builder.mutation<any, any>({
      query(body: any) {
        console.log({ createBankConnecttionParan: body });
        return {
          url: '/api/bank/consent',
          method: 'POST',
          body,
        };
      },
    }),
    authenticateBank: builder.mutation<any, any>({
      query(token: string) {
        console.log({ authenticate: token });
        return {
          url: '/api/bank/auth',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useAuthenticateBankMutation,
  useCreateBankUserMutation,
  useCreateBankConnectionMutation,
} = bankAPI;

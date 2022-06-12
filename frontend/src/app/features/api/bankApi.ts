import { baseAPI } from './api';
import {
  ListResponse,
  TransactionResponse,
} from '../../../../../common/types/basiq.type';
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
    createBasiqUser: builder.mutation<
      BankCreateUserResponse,
      BankCreateUserData
    >({
      query(body) {
        return {
          url: '/api/basiq/user',
          method: 'POST',
          body,
        };
      },
    }),
    getBasiqConsent: builder.mutation<any, any>({
      query(body: any) {
        return {
          url: '/api/basiq/consent',
          method: 'POST',
          body,
        };
      },
    }),
    getBasiqUserTransactions: builder.mutation<
      ListResponse<TransactionResponse>,
      string
    >({
      query(userId) {
        return {
          url: `/api/basiq/transactions/${userId}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useCreateBasiqUserMutation,
  useGetBasiqConsentMutation,
  useGetBasiqUserTransactionsMutation,
} = bankAPI;

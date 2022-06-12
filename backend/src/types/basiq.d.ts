export type CreateUserData = {
  email?: string;
  mobile?: string;
  firstname?: string;
  lastname?: string;
};
export type CreateUserResponse = {
  type: string;
  id: string;
  email: string;
  mobile: string;
  links: {
    self: string;
  };
};
export type InstitutionData = {
  id: string;
};
export type CreateConnectionData = {
  userid: string;
  username: string;
  password: string;
  institution: InstitutionData;
};

export type PaginatedResponse<T> = {
  type: string;
  count: number;
  size: number;
  data: T;
  links: Link;
};

export type Account = {
  type: string;
  id: string;
  accountHolder: string;
  accountNo: string;
  availableFunds: string;
  balance: string;
  class: {
    product: string;
    type: string;
  };
  connection: string;
  currency: string;
  institution: string;
  lastUpdated: string;
  name: string;
  status: string;
  transactionIntervals: [
    {
      from: string;
      to: string;
    },
  ];
  links: {
    institution: string;
    transactions: string;
    self: string;
  };
};
export type TokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

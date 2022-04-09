export type CreateUserData = {
  email?: string;
  mobile?: string;
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
export type Link = {
  self: string;
  account?: string;
  institution?: string;
  connection?: string;
};
export type PaginatedResponse<T> = {
  type: string;
  count: number;
  size: number;
  data: T;
  links: Link;
};
export type TransactionResponse = {
  type: string;
  id: string;
  status: string;
  description: string;
  amount: string;
  account: string;
  balance: string;
  direction: string;
  class: string;
  institution: string;
  connection: string;
  enrich?: any;
  transactionDate: string;
  postDate: string;
  subClass?: any;
  links: Link;
};

export type ListResponse<T> = {
  type: 'list';
  data: T[];
  links: {
    self: string;
  };
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

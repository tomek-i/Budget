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
  export type Link = {
    self: string;
    account?: string;
    institution?: string;
    connection?: string;
  };
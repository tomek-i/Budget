import { TransactionType } from "./transaction.type";

export type CategoryType = {
  title: string;
  description?: string;
  icon?: string;

  transactions?: Array<TransactionType>;
};

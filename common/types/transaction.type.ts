export enum TransactionCategory {
  Payment = "PAYMENT",
  Deposit = "DEP",
  Credit = "CREDIT",
  Other = "OTHER",
  POS = "POS",
  Cash = "CASH",
}

export type TransactionType = {
  id: string;
  bankAccount: string;
  date: string; //'07/12/2018',
  narrative: string; //'DEBIT CARD PURCHASE TARONGA CONSERVATION S MOSMAN       AUS',
  debitAmount: number; //'169.20',
  creditAmount: number;
  balance: number; //number
  categories: TransactionCategory; //"PAYMENT" | "DEP" | "CREDIT" | "OTHER" | "POS" | "CASH";
  serial: string;
  category?: string;
};

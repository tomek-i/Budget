/**
 * Westpac CSV Transaction representation.
 */
export type WestpacBankTransaction = {
  /**
   * the bank account the transactions was issued against
   */
  'Bank Account': string;
  /**
   * representing the date in format DD/MM/YYYY
   */
  Date: Date;
  /**
   * description of the transaction
   */
  Narrative: string;
  /**
   * amount debited
   */
  'Debit Amount': number;
  /**
   * amount credited
   */
  'Credit Amount': number;
  /**
   * account balance
   */
  Balance: number;
  /**
   * PAYMENT | DEP | CREDIT | OTHER | POS | CASH
   */
  Categories: 'PAYMENT' | 'DEP' | 'CREDIT' | 'OTHER' | 'POS' | 'CASH';
  /**
   * Not sure - seems to be always blank
   */
  Serial: string;
};

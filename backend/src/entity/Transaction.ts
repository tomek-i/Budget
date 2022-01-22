import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WestpacBankTransaction } from '../types/bankTransaction';
import { Category } from './Category';

export type TransactionPatchRequest = {
  balance?: string;
  bankAccount?: string;
  categories?: string;
  creditAmount?: string;
  date?: string;
  debitAmount?: string;
  narrative?: string;
  serial?: string;

  comment?: string;
  category?: string;
};
@Entity()
export class Transaction {
  constructor(data?: WestpacBankTransaction) {
    if (data) {
      this.balance = data.Balance;
      this.bankAccount = data['Bank Account'];
      this.categories = data.Categories;
      this.creditAmount = data['Credit Amount'];
      this.date = data.Date.toString();
      this.debitAmount = data['Debit Amount'];
      this.narrative = data.Narrative;
      this.serial = data.Serial;
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bankAccount: string;

  @Column()
  date: string; //'07/12/2018',
  //'07/12/2018',

  @Column()
  narrative: string; //'DEBIT CARD PURCHASE TARONGA CONSERVATION S MOSMAN       AUS',
  //'DEBIT CARD PURCHASE TARONGA CONSERVATION S MOSMAN       AUS',

  @Column()
  debitAmount: number; //'169.20',
  //'169.20',

  @Column()
  creditAmount: number;

  @Column()
  balance: number; //number
  //number

  @Column()
  categories: 'PAYMENT' | 'DEP' | 'CREDIT' | 'OTHER' | 'POS' | 'CASH';

  @Column()
  serial: string;

  @Column({ nullable: true })
  comment?: string;

  @ManyToOne(() => Category, (category: Category) => category.transactions)
  category?: string;
}

import { Transaction } from '../entity/Transaction';
import { DatabaseService } from './DatabaseService';

const getById = async (id: string): Promise<Transaction | undefined> => {
  return DatabaseService.get<Transaction>(Transaction, id);
};
const getAll = async (): Promise<Transaction[] | undefined> => {
  return DatabaseService.getAll<Transaction>(Transaction);
};

export const TransactionService = { getById, getAll };

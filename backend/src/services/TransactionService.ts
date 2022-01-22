import { UpdateResult } from 'typeorm';
import { Transaction, TransactionPatchRequest } from '../entity/Transaction';
import { DatabaseService } from './DatabaseService';

const getById = async (id: string): Promise<Transaction | undefined> => {
  return DatabaseService.get<Transaction>(Transaction, id);
};
const getAll = async (): Promise<Transaction[] | undefined> => {
  return DatabaseService.getAll<Transaction>(Transaction);
};
const patch = async (
  id: string,
  data: TransactionPatchRequest,
): Promise<UpdateResult> => {
  return DatabaseService.patch(Transaction, data, { id })!;
};

export const TransactionService = { getById, getAll, patch };

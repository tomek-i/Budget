import { UpdateResult } from 'typeorm';
import { Transaction, TransactionPatchRequest } from '../../entity/Transaction';
// import { DatabaseService } from '../DatabaseService/DatabaseService';

const getById = async (id: string): Promise<Transaction | undefined> => {
  // return DatabaseService().get<Transaction>(Transaction, id);
  return undefined;
};
const getAll = async (): Promise<Transaction[] | undefined> => {
  // return DatabaseService().getAll<Transaction>(Transaction);
  return undefined;
};
const patch = async (
  id: string,
  data: TransactionPatchRequest,
) /*: Promise<UpdateResult>*/ => {
  // return DatabaseService().patch(Transaction, data, { id })!;
  return undefined;
};

export const TransactionService = { getById, getAll, patch };

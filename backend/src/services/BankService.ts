import { CreateConnectionData, CreateUserData } from '../types/basiq';
import { Basiq } from './BasiqService';

const basiq = new Basiq();

const getConsent = (userId: string) => {
  return basiq.getConsent(userId);
};
const getAccounts = async (userId: string) => {
  return basiq.getAccounts(userId);
};
const getAccount = async (userId: string, accountId: string) => {
  return basiq.getAccount(userId, accountId);
};
const createConnection = async (data: CreateConnectionData) => {
  return basiq.createConnection(data);
};
const getTransactions = (userId: string, accountId?: string) => {
  return basiq.getTransactions(userId, accountId);
};

/**
 * Creates a new user on the Basiq plafotm
 * @param data
 * @returns
 */
const createUser = (data: CreateUserData) => {
  return basiq.createUser(data);
};

export const BankService = {
  getTransactions,
  createConnection,
  createUser,
  getAccounts,
  getAccount,
  getConsent,
};

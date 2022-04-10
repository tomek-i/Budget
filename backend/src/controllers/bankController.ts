import { BankService } from '../services/BankService';
import { CreateConnectionData, CreateUserData } from '../types/basiq';
import {
  Get,
  Route,
  Tags,
  Post,
  Body,
  Path,
  Delete,
  SuccessResponse,
} from 'tsoa';
import { User } from '../entity/User';
import { UserService } from '../services/UserService';

@Route('api/bank')
@Tags('Bank')
export class BankController {
  public async createUser(data: CreateUserData) {
    return BankService.createUser(data);
  }
  public async createConnection(data: CreateConnectionData) {
    return BankService.createConnection(data);
  }

  public async getConsent(userId: string) {
    return BankService.getConsent(userId);
  }

  public async getAccounts(userId: string) {
    return BankService.getAccounts(userId);
  }
  public async getAccount(userId: string, accountId: string) {
    return BankService.getAccount(userId, accountId);
  }
  public async getTransactions(userId: string, accountId?: string) {
    return BankService.getTransactions(userId, accountId);
  }
}

import { CreateConnectionData, CreateUserData } from '../types/basiq';
import { Route, Tags } from 'tsoa';
import { Basiq } from '../services/BasiqService';

@Route('api/bank')
@Tags('Bank')
export class BankController {
  basiqService: Basiq;
  constructor() {
    this.basiqService = new Basiq();
  }
  public async createUser(data: CreateUserData) {
    return this.basiqService.createUser(data);
  }
  public async createConnection(data: CreateConnectionData) {
    return this.basiqService.createConnection(data);
  }

  public async getConsent(userId: string) {
    return this.basiqService.getConsentUrl(userId);
  }

  public async getAccounts(userId: string) {
    return this.basiqService.getAccounts(userId);
  }
  public async getAccount(userId: string, accountId: string) {
    return this.basiqService.getAccount(userId, accountId);
  }
  public async getTransactions(userId: string, accountId?: string) {
    return this.basiqService.getTransactions(userId, accountId);
  }
}

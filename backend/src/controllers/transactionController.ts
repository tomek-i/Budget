import { Get, Route, Tags } from 'tsoa';
import { Transaction } from '../entity/Transaction';
import { TransactionService } from '../services/TransactionService';

@Route('api/transactions')
@Tags('Transaction')
export class TransactionController {
  @Get('/')
  public async getAll(): Promise<Transaction[]> {
    let result = await TransactionService.getAll();
    if (!result) throw new Error('Could not fetch categories.');
    return result;
  }
}

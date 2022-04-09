import { Body, Get, Patch, Path, Route, Tags } from 'tsoa';
import { Transaction, TransactionPatchRequest } from '../entity/Transaction';
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

  @Get('/:id')
  public async getById(@Path() id: string): Promise<Transaction> {
    let result = await TransactionService.getById(id);
    if (!result) throw new Error('Could not fetch user.');
    return result;
  }

  @Patch('/:id')
  public async patch(
    @Path() id: string,
    @Body() data: TransactionPatchRequest,
  ) {
    return TransactionService.patch(id, data);
  }
}

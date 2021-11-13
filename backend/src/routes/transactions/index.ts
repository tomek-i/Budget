import { TransactionController } from '../../controllers/transactionController';
import { Router } from 'express';

export const TransactionRoutes = Router();

const controller = new TransactionController();

// URL: ./transactions/
TransactionRoutes.get('/', async (req, res) => {
  let resuls = await controller.getAll();
  res.json(resuls);
});
TransactionRoutes.get('/:id', async (req, res) => {
  res.send('TODO');
});
TransactionRoutes.delete('/:id', async (req, res) => {
  res.send('TODO');
});

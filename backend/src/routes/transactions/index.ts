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
  let resuls = await controller.getById(req.params.id);
  res.json(resuls);
});
TransactionRoutes.delete('/:id', async (req, res) => {
  res.send('TODO');
});

//applies partial modification
TransactionRoutes.patch('/:id', async (req, res) => {
  let result = await controller.patch(req.params.id, req.body);
  res.json(result);
});

import { TransactionController } from '../controllers/TransactionController';
import { Router, Request, Response } from 'express';

export const TransactionRoutes = Router();

const controller = new TransactionController();

// URL: ./transactions/
TransactionRoutes.get('/', async (req: Request, res: Response) => {
  let resuls = await controller.getAll();
  res.json(resuls);
});
TransactionRoutes.get('/:id', async (req: Request, res: Response) => {
  let resuls = await controller.getById(req.params.id);
  res.json(resuls);
});
TransactionRoutes.delete('/:id', async (req: Request, res: Response) => {
  res.send('TODO');
});

//applies partial modification
TransactionRoutes.patch('/:id', async (req: Request, res: Response) => {
  let result = await controller.patch(req.params.id, req.body);
  res.json(result);
});

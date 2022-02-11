import { Router } from 'express';
import { AdminRoutes } from './admin';
import { UserRoutes } from './user';
import { CategoryRoutes } from './categories';
import { TransactionRoutes } from './transactions';
import { BankRoutes } from './bank';

export const router = Router();

// https://expressjs.com/en/guide/routing.html

router.use('/admin', AdminRoutes);
router.use('/users', UserRoutes);
router.use('/categories', CategoryRoutes);
router.use('/bank', BankRoutes);
router.use('/transactions', TransactionRoutes);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

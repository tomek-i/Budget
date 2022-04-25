import { Router, Request, Response } from 'express';
import { AdminRoutes } from './admin/AdminRoutes';
import { UserRoutes } from './UserRoutes';
import { CategoryRoutes } from './CategoriesRoutes';
import { TransactionRoutes } from './TransactionRoutes';
import { BankRoutes } from './BankRoutes';
import { BasiqRoutes } from './BasiqRoutes';
import { AuthRoutes } from './AuthRoutes';

export const router = Router();

// https://expressjs.com/en/guide/routing.html

router.use('/auth', AuthRoutes);

router.use('/admin', AdminRoutes);
router.use('/users', UserRoutes);
router.use('/basiq', BasiqRoutes);
// router.use('/categories', CategoryRoutes);
// router.use('/bank', BankRoutes);
// router.use('/transactions', TransactionRoutes);

//NOTE: only for development?!
router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

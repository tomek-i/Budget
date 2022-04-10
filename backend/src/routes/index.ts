import { Router } from 'express';
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
router.use('/categories', CategoryRoutes);
router.use('/bank', BankRoutes);
router.use('/transactions', TransactionRoutes);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

//NOTE: only for development?!
router.use('/basiq', BasiqRoutes);

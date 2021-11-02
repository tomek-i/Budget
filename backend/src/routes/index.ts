import { Router } from 'express';
import { AdminRoutes } from './admin';
import { UserRoutes } from './user';

export const router = Router();

// https://expressjs.com/en/guide/routing.html

router.use('/admin', AdminRoutes);
router.use('/users', UserRoutes);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

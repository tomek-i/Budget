import { Router } from 'express';
import { DatabaseSeedController } from '../../../controllers/DatabaseSeedController';

export const DatabaseRoutes = Router();

// URL: ./admin/db/
DatabaseRoutes.get('/seed', DatabaseSeedController.seed);
DatabaseRoutes.get('/seed/users', DatabaseSeedController.seedUsers);
DatabaseRoutes.get('/seed/categories', DatabaseSeedController.seedCategories);
DatabaseRoutes.get('/clear/users', DatabaseSeedController.clearUsers);
DatabaseRoutes.get('/clear/categories', DatabaseSeedController.clearCategories);

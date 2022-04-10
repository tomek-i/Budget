import { Router } from 'express';
import { DatabaseSeedController } from '../../../controllers/DatabaseSeedController';

export const DatabaseRoutes = Router();

// URL: ./admin/db/
DatabaseRoutes.get('/seed', DatabaseSeedController.seed);
DatabaseRoutes.get('/clear/users', DatabaseSeedController.clearUsers);

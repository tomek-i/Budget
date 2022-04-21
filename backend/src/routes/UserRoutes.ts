import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { User } from '../entity/User';
import auth from '../middlewares/auth';
import { AppDataSource } from '../services/DatabaseService';
import { UserService } from '../services/UserService';

export const UserRoutes = Router();

const controller = new UserController(
  new UserService(AppDataSource.getRepository(User)),
);

UserRoutes.get('/me', auth, async (req: Request, res: Response) => {
  //???????
  let a: any = req;
  res.json(a.user);
});

UserRoutes.get('/', (req, res) => controller.getAll(req, res));
UserRoutes.get('/:id', (req, res) => controller.getById(req, res));
UserRoutes.patch('/', (req, res) => controller.patchUser(req, res));
UserRoutes.post('/', (req, res) => controller.createUser(req, res));
UserRoutes.delete('/:id', (req, res) => controller.deleteUser(req, res));

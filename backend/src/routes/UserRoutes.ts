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
  console.log('ME CALLED');
  let authRequest: any = req;
  res.status(200).json(authRequest.user);
});

UserRoutes.get('/', async (_req, res) => {
  const data = await controller.getAll();
  res.status(200).json({ data });
});

UserRoutes.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ error: 'missing id' });
    return;
  }
  const data = await controller.getById(id);
  res.status(200).json({ data });
});
UserRoutes.patch('/', async (req, res) => {
  const user = new User();
  Object.assign(user, req.body);

  const data = await controller.patchUser(user);
  res.status(200).json({ data });
});

UserRoutes.post('/', async (req, res) => {
  if (!(req.body && req.body.username && req.body.email && req.body.password)) {
    res.status(500).json({ error: 'invalid request' });
    return;
  }

  const user = new User(req.body);
  const data = await controller.createUser(user);
  res.status(201).json({ data });
});
UserRoutes.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const data = await controller.deleteUser(id);
  res.status(204).json({ data });
});

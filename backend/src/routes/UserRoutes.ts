import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import auth from '../middlewares/auth';
import * as jwt from 'jsonwebtoken';
export const UserRoutes = Router();
const controller = new UserController();

//URL: ./users/
UserRoutes.get('/', async (req: Request, res: Response) => {
  let response = await controller.getAll();
  res.json(response);
});

UserRoutes.get('/me', auth, async (req: Request, res: Response) => {
  let a: any = req;
  res.json(a.user);
});

UserRoutes.get('/:id', async (req: Request, res: Response) => {
  const response = await controller.getById(req.params.id);
  if (!response) res.status(404).send({ message: 'No user found' });
  return res.send(response);
});

UserRoutes.patch('/', async (req: Request, res: Response) => {
  try {
    let response = await controller.patchUser(req.body);
    if (!response) res.status(500).send({ message: "Couldn't update user." });
    return res.send(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

UserRoutes.patch('/', async (req: Request, res: Response) => {
  try {
    let response = await controller.createUser(req.body);
    if (!response) res.status(500).send({ message: "Couldn't create user." });
    return res.send(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

UserRoutes.delete('/:id', async (req: Request, res: Response) => {
  const controller = new UserController();
  await controller.deleteUser(req.params.id);
  /*
    '204':
      description: Deleted
    '404':
      description: id not found
    '401':
      description: Unauthorized
  */
  res.sendStatus(204);
});

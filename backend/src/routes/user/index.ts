import { Router } from 'express';
import { UserController } from '../../controllers/userController';

export const UserRoutes = Router();
const controller = new UserController();

//URL: ./users/
UserRoutes.get('/', async (req, res) => {
  let response = await controller.getAll();
  res.json(response);
});

UserRoutes.get('/:id', async (req, res) => {
  const response = await controller.getById(req.params.id);
  if (!response) res.status(404).send({ message: 'No user found' });
  return res.send(response);
});

UserRoutes.post('/', async (req, res) => {
  console.log('REQUEST REDCIEVED:', req.body);
  let response = await controller.createUser(req.body);
  if (!response) res.status(500).send({ message: "Couldn't create user." });
  return res.send(response);
});

UserRoutes.delete('/:id', async (req, res) => {
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

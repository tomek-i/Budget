import { Router } from 'express';
import { UserController } from '../../controllers/userController';
import { DatabaseService } from '../../services/DatabaseService';

export const UserRoutes = Router();

// URL: ./users/
//UserRoutes.get('/', UserController.getAll);
UserRoutes.get('/', (req, res) => {
  res.send('OK USERS');
});

UserRoutes.get('/:id', async (req, res) => {
  const controller = new UserController();
  const response = await controller.getById(req.params.id);
  if (!response) res.status(404).send({ message: 'No user found' });
  return res.send(response);
});

UserRoutes.delete('/:id', async (req, res) => {
  const controller = new UserController();
  await controller.deleteUser(req.params.id);
  /*'204':
        description: Deleted
      '404':
        description: id not found
      '401':
        description: Unauthorized
        */
  res.sendStatus(204);
});

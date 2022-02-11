import { Router } from 'express';
import { BankController } from '../../controllers/BankController';

export const BankRoutes = Router();
const controller = new BankController();

//URL: ./bank/
BankRoutes.get('/auth', async (req, res) => {
  let response = await controller.auth();
  console.log({ response });
  res.json(response);
});
BankRoutes.get('/accounts', async (req, res) => {
  let response = await controller.getAccounts(req.body);
  console.log({ response });
  res.json(response);
});
BankRoutes.post('/connect', async (req, res) => {
  let response = await controller.createConnection(req.body);
  console.log({ response });
  res.json(response);
});
BankRoutes.post('/createUser', async (req, res) => {
  let response = await controller.createUser(req.body);
  res.json(response);
});

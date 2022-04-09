import { Router } from 'express';
import { BankController } from '../../controllers/BankController';

export const BankRoutes = Router();
const controller = new BankController();

//URL: ./bank/
BankRoutes.get('/auth', async (req, res) => {
  let response = await controller.auth();
  res.json(response);
});
BankRoutes.get('/:userId/accounts', async (req, res) => {
  try {
    let response = await controller.getAccounts(req.params.userId);
    res.json(response);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});
BankRoutes.get('/:userId/account/:accountId', async (req, res) => {
  try {
    let response = await controller.getAccount(
      req.params.userId,
      req.params.accountId,
    );
    res.json(response);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});
BankRoutes.get('/:userId/account/:accountId/transactions', async (req, res) => {
  try {
    let response = await controller.getTransactions(
      req.params.userId,
      req.params.accountId,
    );
    res.json(response);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});
BankRoutes.get('/:userId/transactions', async (req, res) => {
  try {
    let response = await controller.getTransactions(req.params.userId);
    res.json(response);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

BankRoutes.post('/connect', async (req, res) => {
  try {
    let response = await controller.createConnection(req.body);
    res.json(response);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
BankRoutes.post('/createUser', async (req, res) => {
  try {
    let response = await controller.createUser(req.body);
    res.json(response);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

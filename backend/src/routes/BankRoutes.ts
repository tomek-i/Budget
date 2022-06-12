import { Router, Request, Response } from 'express';
import { BankController } from '../controllers/BankController';

export const BankRoutes = Router();
const controller = new BankController();

//URL: ./bank/

BankRoutes.get('/:userId/accounts', async (req: Request, res: Response) => {
  try {
    let response = await controller.getAccounts(req.params.userId);
    res.json(response);
  } catch (error: any) {
    //TODO: sanitize
    res.status(500).send(error.message);
  }
});
BankRoutes.get(
  '/:userId/account/:accountId',
  async (req: Request, res: Response) => {
    try {
      let response = await controller.getAccount(
        req.params.userId,
        req.params.accountId,
      );
      res.json(response);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  },
);
BankRoutes.get(
  '/:userId/account/:accountId/transactions',
  async (req: Request, res: Response) => {
    try {
      let response = await controller.getTransactions(
        req.params.userId,
        req.params.accountId,
      );
      res.json(response);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  },
);
BankRoutes.get('/:userId/transactions', async (req: Request, res: Response) => {
  try {
    let response = await controller.getTransactions(req.params.userId);
    res.json(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

BankRoutes.post('/consent', async (req: Request, res: Response) => {
  try {
    let response = await controller.getConsent(req.body.id);
    // res.redirect(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

BankRoutes.post('/connect', async (req: Request, res: Response) => {
  try {
    let response = await controller.createConnection(req.body);
    res.json(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
BankRoutes.post('/createUser', async (req, res, next) => {
  try {
    let response = await controller.createUser(req.body);
    res.json(response);
  } catch (error: any) {
    next(error);
  }
});

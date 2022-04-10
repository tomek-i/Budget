import { Router, Request, Response } from 'express';
import { Basiq, BasiqScope } from '../services/BasiqService';

export const BasiqRoutes = Router();
const api = new Basiq();

BasiqRoutes.post('/token/server', async (req: Request, res: Response) => {
  res.json(await api.generateToken(BasiqScope.SERVER_ACCESS));
});
BasiqRoutes.post('/token/client', async (req: Request, res: Response) => {
  res.json(await api.generateToken(BasiqScope.CLIENT_SCOPE));
});
BasiqRoutes.post('/user', async (req: Request, res: Response) => {
  res.json(await api.createUser(req.body));
});

BasiqRoutes.get('/consent', async (req: Request, res: Response) => {
  res.json(await api.getConsent(req.body.id));
});

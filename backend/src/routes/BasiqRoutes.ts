import { Router, Request, Response } from 'express';
import { Basiq, BasiqScope } from '../services/BasiqService/BasiqService';

export const BasiqRoutes = Router();
const api = new Basiq();

BasiqRoutes.post('/token/server', async (req: Request, res: Response) => {
  res.json(await api.generateToken(BasiqScope.SERVER_ACCESS));
});
BasiqRoutes.post('/token/client', async (req: Request, res: Response) => {
  const token = await api.generateToken(BasiqScope.CLIENT_SCOPE, req.body.id);
  const url = `https://consent.basiq.io/home?userId=${req.body.id}&token=${token.access_token}`;
  console.log({ url });
  res.redirect(url);
});
BasiqRoutes.post('/user', async (req: Request, res: Response) => {
  res.json(await api.createUser(req.body));
});

BasiqRoutes.get('/consent', async (req: Request, res: Response) => {
  res.json(await api.getConsent(req.body.id));
});

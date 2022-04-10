import { Router } from 'express';
import { Basiq, BasiqScope } from '../services/BasiqService';

export const BasiqRoutes = Router();
const api = new Basiq();

BasiqRoutes.post('/token/server', async (req, res) => {
  res.json(await api.generateToken(BasiqScope.SERVER_ACCESS));
});
BasiqRoutes.post('/token/client', async (req, res) => {
  res.json(await api.generateToken(BasiqScope.CLIENT_SCOPE));
});
BasiqRoutes.post('/user', async (req, res) => {
  res.json(await api.createUser(req.body));
});

BasiqRoutes.get('/consent', async (req, res) => {
  res.json(await api.getConsent(req.body.id));
});

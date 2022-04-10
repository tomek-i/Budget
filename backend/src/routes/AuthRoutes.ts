import { Router } from 'express';
import { AuthService } from '../services/AuthService';

export const AuthRoutes = Router();

AuthRoutes.post('/login', async (req, res) => {
  let result = await AuthService.login(req.body);
  return res.json(result);
});
AuthRoutes.post('/signup', async (req, res) => {
  let result = await AuthService.register(req.body);
  return res.json(result);
});

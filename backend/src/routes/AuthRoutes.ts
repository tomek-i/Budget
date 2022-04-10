import { Router, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export const AuthRoutes = Router();

AuthRoutes.post('/login', async (req: Request, res: Response) => {
  let result = await AuthService.login(req.body);
  return res.json(result);
});
AuthRoutes.post('/signup', async (req: Request, res: Response) => {
  let result = await AuthService.register(req.body);
  return res.json(result);
});

import { Router, Request, Response } from 'express';
import { AuthService } from '../services/AuthService/AuthService';

export const AuthRoutes = Router();

AuthRoutes.post('/login', async (req: Request, res: Response) => {
  try {
    let result = await AuthService.login(req.body);
    return res.json(result);
  } catch (error: any) {
    return res.status(401).json({
      error: 401,
      message: error.message,
    });
  }
});
AuthRoutes.post('/signup', async (req: Request, res: Response) => {
  let result = await AuthService.register(req.body);
  return res.json(result);
});

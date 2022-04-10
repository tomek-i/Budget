import * as express from 'express';
import { UserService } from '../services/UserService';

const getAdminById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.params.id) throw new Error('Id parameter invalid.');
  if (!parseInt(req.params.id, 10)) {
    return next(); //skip this route if not a number
  }
  res.json(await UserService().getById(req.params.id));
};

const getAdminByUsername = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.params.username) throw new Error('username parameter invalid.');
  if (parseInt(req.params.username, 10)) {
    return next(); //skip this route if not a number
  }
  res.json(await UserService().getById(req.params.username));
};
export const AdminController = {
  getAdminById,
  getAdminByUsername,
};

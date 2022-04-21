import { Request, Response } from 'express';
import { User } from '../entity/User';
import { UserService } from '../services/UserService';

abstract class Controller<T> {
  abstract getAll(req: Request, res: Response): void;
  abstract getOne(req: Request, res: Response): void;
  abstract createOne(req: Request, res: Response): void;
  abstract deleteOne(req: Request, res: Response): void;
  abstract updateOne(req: Request, res: Response): void;
}

class UserController extends Controller<User> {
  service: UserService;

  getAll(req: Request, res: Response) {
    res.status(200).json({
      data: null,
    });
  }
  getOne(req: Request, res: Response) {
    res.status(200).json({
      data: null,
    });
  }
  createOne(req: Request, res: Response) {
    res.status(201).json({
      data: null,
      message: 'User created.',
    });
  }
  deleteOne(req: Request, res: Response) {
    res.status(204).json({
      data: null,
      message: 'User deleted.',
    });
  }
  updateOne(req: Request, res: Response) {
    res.status(200).json({
      data: null,
      message: 'User updated.',
    });
  }
}

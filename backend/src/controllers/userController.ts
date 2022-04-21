import { Request, Response } from 'express';
import {
  Get,
  Route,
  Tags,
  Post,
  Body,
  Path,
  Delete,
  SuccessResponse,
  Patch,
} from 'tsoa';
import { User } from '../entity/User';
import { AppDataSource } from '../services/DatabaseService';
import { UserService } from '../services/UserService/UserService';
//https://github.com/MakingSense/tsoa-api
@Route('api/users')
@Tags('User')
export class UserController {
  service: UserService;
  constructor(userService: UserService) {
    this.service = userService;
    console.log({ this_service: this.service });
    console.log({ this: this });
  }

  public async getAll(_req: Request, res: Response) {
    console.log({ this: this });
    let data = await this.service.getAll();
    res.status(200).json({ user: data });
  }

  //@Get('/:id')
  public async getById(req: Request, res: Response) {
    let id = req.params.id;
    if (!id) {
      res.status(500).json({ error: 'missing id' });
      return;
    }
    let data = await this.service.getById(id);
    res.status(200).json({ user: data });
  }

  //@Post()
  @SuccessResponse(201)
  public async createUser(req: Request, res: Response) {
    let requestBody = req.body;
    if (!requestBody) throw Error('Missing data');
    if (!requestBody.username) throw Error('Invalid username');
    if (!requestBody.email) throw Error('Invalid email');
    if (!requestBody.password) throw Error('Invalid password');

    let user = await this.service.create(
      new User({
        username: requestBody.username,
        email: requestBody.email,
        password: requestBody.password,
      }),
    );
    res.status(201).json({ user });
  }

  //@Patch()
  public async patchUser(req: Request, res: Response) {
    let user = new User();
    let x = Object.assign(user, req.body);
    let updated = await this.service.update(user);
    res.status(200).json({ data: { user: updated } });
  }

  //@Delete('/:id')
  @SuccessResponse(204)
  public async deleteUser(req: Request, res: Response) {
    let user = new User();
    user.id = req.params.id;
    let result = await this.service.delete(user);
    res.status(204).json({ data: result });
  }
}

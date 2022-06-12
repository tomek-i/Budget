import { Get, Route, Tags, Delete, SuccessResponse } from 'tsoa';
import { User } from '../entity/User';
import { UserService } from '../services/UserService/UserService';
//https://github.com/MakingSense/tsoa-api
@Route('api/users')
@Tags('User')
export class UserController {
  service: UserService;
  constructor(userService: UserService) {
    this.service = userService;
  }

  @Get()
  public async getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  public async getById(id: string) {
    return await this.service.getById(id);
  }

  //@Post() <-- throws error
  @SuccessResponse(201)
  public async createUser(user: User) {
    return this.service.create(user);
  }

  //@Patch() <-- throws error
  public async patchUser(user: User) {
    return this.service.update(user);
  }

  @Delete('/:id')
  @SuccessResponse(204)
  public async deleteUser(id: string) {
    let user = new User();
    user.id = id;
    return this.service.delete(user);
  }
}

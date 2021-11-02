import {
  Get,
  Route,
  Tags,
  Post,
  Body,
  Path,
  Delete,
  SuccessResponse,
} from 'tsoa';
import { User, UserType } from '../entity/User';
import { UserService } from '../services/UserService';

//import { UsersService, UserCreationParams } from './usersService';

@Route('api/users')
@Tags('User')
export class UserController {
  @Get('/:id')
  public async getById(@Path() id: string): Promise<User> {
    let result = await UserService.getById(id);
    if (!result) throw new Error('Could not fetch user.');
    return result;
  }

  @Post()
  public async createUser(@Body() requestBody: User): Promise<User> {
    let result = await UserService.create(requestBody);
    if (!result) throw new Error('Could not create user.');
    //TODO: maybe just send back the ID ?
    return result;
  }

  @Delete('/:id')
  @SuccessResponse(204)
  public async deleteUser(@Path() id: string) {
    console.log('DELETE ID:', id);
  }
}

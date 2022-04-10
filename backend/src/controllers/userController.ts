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
import { UserService } from '../services/UserService';

@Route('api/users')
@Tags('User')
export class UserController {
  @Get('/')
  public async getAll(): Promise<User[]> {
    let result = await UserService().getAll();
    if (!result) throw new Error('Could not fetch user.');
    return result;
  }

  @Get('/:id')
  public async getById(@Path() id: string): Promise<User> {
    let result = await UserService().getById(id);
    if (!result) throw new Error('Could not fetch user.');
    return result;
  }

  @Post()
  @SuccessResponse(201)
  public async createUser(@Body() requestBody: User): Promise<User> {
    if (!requestBody) throw Error('Missing data');
    if (!requestBody.username) throw Error('Invalid username');
    if (!requestBody.email) throw Error('Invalid email');
    if (!requestBody.password) throw Error('Invalid password');

    let result = await UserService().create(requestBody);
    if (!result) throw new Error('Could not create user.');
    //TODO: maybe just send back the ID ?
    return result;
  }

  @Patch()
  public async patchUser(@Body() requestBody: User) {
    if (!requestBody) throw Error('Missing data');

    console.log({ PATCH: requestBody });
    try {
      let result = await UserService().patch(requestBody);
      console.log({ PATCHRESULT: result });
      // if (!result) throw new Error('Could not create user.');
      //TODO: maybe just send back the ID ?
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Delete('/:id')
  @SuccessResponse(204)
  public async deleteUser(@Path() id: string) {}
}

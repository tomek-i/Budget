import { User } from '../entity/User';
import { UserType } from '../../../common/types/user.type';
import { DatabaseService } from './DatabaseService';

const getById = async (id: string): Promise<User | undefined> => {
  return DatabaseService.get<User>(User, id);
};
const getAll = async (): Promise<User[] | undefined> => {
  return DatabaseService.getAll<User>(User);
};

const create = async (data: UserType): Promise<User | undefined> => {
  /*
  {
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data,
  }
  */
  return DatabaseService.save(new User(data));
};

export const UserService = { getById, create, getAll };

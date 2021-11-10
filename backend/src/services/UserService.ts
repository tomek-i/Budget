import { User, UserType } from '../entity/User';
import { DatabaseService } from './DatabaseService';

const getById = async (id: string): Promise<User | undefined> => {
  return DatabaseService.get<User>(User, id);
};
const getAll = async (): Promise<User[] | undefined> => {
  return DatabaseService.getAll<User>(User);
};

const create = async (data: UserType): Promise<User | undefined> => {
  return DatabaseService.save({
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data,
  });
};

export const UserService = { getById, create, getAll };

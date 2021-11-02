import { User, UserType } from '../entity/User';
import { DatabaseService } from './DatabaseService';

const getById = async (id: string): Promise<User | undefined> => {
  return DatabaseService.get<User>(User, id);
};

const create = async (data: UserType): Promise<User | undefined> => {
  return DatabaseService.save({
    id: '',
    ...data,
  });
};

export const UserService = { getById, create };

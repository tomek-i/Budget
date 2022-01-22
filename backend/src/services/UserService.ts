import { User, UserType } from '../entity/User';
import { DatabaseService } from './DatabaseService';

const getById = async (id: string): Promise<User | undefined> => {
  return DatabaseService.get<User>(User, id);
};
const getAll = async (): Promise<User[] | undefined> => {
  return DatabaseService.getAll<User>(User);
};

const createMany = async (users: UserType[]): Promise<User[] | undefined> => {
  const result: User[] = [];
  for (const user of users) {
    let savedUser = await create(user);
    if (savedUser) result.push(savedUser);
  }
  return result;
};

const create = async (data: UserType): Promise<User | undefined> => {
  let user = new User();
  Object.assign(user, data);
  let test = {
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    hashPassword: user.hashPassword, //NOTE: why do i have to put it in here?!
    ...data,
  };

  let newUser = await DatabaseService.save<User>(user);
  if (newUser) {
    let passwordLess: User = {
      ...newUser,
      hashPassword: newUser.hashPassword, //NOTE: why do i have to specify this?
    };
    return passwordLess;
  }
  throw new Error("Couldn't create user.");
};

export const UserService = { getById, create, getAll, createMany };

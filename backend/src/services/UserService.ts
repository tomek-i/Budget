import { User } from '../entity/User';
import { UserType } from '../../../common/types/user.type';
import { DatabaseService } from './DatabaseService';

const getById = async (id: string): Promise<User | undefined> => {
  return DatabaseService.get<User>(User, id);
};
const getByEmail = async (email: string): Promise<User | undefined> => {
  return DatabaseService.findOne<User>(User, { email });
};

const getByIdentity = async (identity: string): Promise<User | undefined> => {
  return DatabaseService.findOne<User>(User, {
    select: ['username', 'email', 'password', 'salt', 'id'],
    where: [{ username: identity }, { email: identity }],
  });
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

export type UserPatchType = {
  id: string;
  username?: string;
  password?: string;
  email?: string;
  mobile?: string;
};
const save = async (data: User) => {
  console.log({ data });
  return DatabaseService.save(data);
};
const patch = async (data: UserPatchType) => {
  console.log({ data });
  return DatabaseService.patch(User, data);
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
      checkPassword: newUser.checkPassword,
      normalizeMobile: newUser.normalizeMobile,
    };
    return passwordLess;
  }
  throw new Error("Couldn't create user.");
};

export const UserService = {
  getById,
  create,
  patch,
  save,
  getAll,
  createMany,
  getByEmail,
  getByIdentity,
};

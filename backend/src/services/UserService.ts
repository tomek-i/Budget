import { User } from '../entity/User';
import { UserType } from '../../../common/types/user.type';
import { DatabaseService, DatabaseServiceType } from './DatabaseService';

let service: DatabaseServiceType = DatabaseService();

const getById = async (id: string): Promise<User | undefined> => {
  return service.get<User>(User, id);
};
const getByEmail = async (email: string): Promise<User | undefined> => {
  return service.findOne<User>(User, { email });
};

const getByIdentity = async (identity: string): Promise<User | undefined> => {
  return service.findOne<User>(User, {
    select: ['username', 'email', 'password', 'salt', 'id'],
    where: [{ username: identity }, { email: identity }],
  });
};

const getAll = async (): Promise<User[] | undefined> => {
  return service.getAll<User>(User);
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
  return service.save(data);
};
const patch = async (data: UserPatchType) => {
  console.log({ data });
  return service.patch(User, data);
};
const create = async (data: UserType): Promise<User | undefined> => {
  let user = new User();
  Object.assign(user, data);

  let newUser = await service.save<User>(user);
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

export const UserService = (database?: DatabaseServiceType) => {
  service = database ?? DatabaseService();
  return {
    getById,
    create,
    patch,
    save,
    getAll,
    createMany,
    getByEmail,
    getByIdentity,
  };
};

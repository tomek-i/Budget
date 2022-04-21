import { mocked } from 'ts-jest/utils';
import { DeleteResult } from 'typeorm';

import { User } from '../src/entity/User';
import {
  DatabaseService,
  DatabaseServiceType,
} from '../src/services/DatabaseService';
import { UserService } from '../src/services/UserService';

jest.mock('../src/services/DatabaseService', () => {
  const originalModule = jest.requireActual('../src/services/DatabaseService');

  return {
    __esModule: true,
    //...originalModule,

    DatabaseService: jest.fn().mockImplementation(() => {
      let y: DeleteResult = {
        raw: '',
        affected: 0,
      };
      let x: DatabaseServiceType = {
        save: jest.fn().mockImplementation(() => {}), // <T>(user: T) => Promise.resolve(user),
        getAll: jest.fn().mockImplementation(() => []), //<T>(user: T) => Promise.resolve([user]),
        get: <T>(user: T) => Promise.resolve(user),
        find: <T>(user: T) => Promise.resolve(user),
        findOne: <T>(user: T) => Promise.resolve(user),
        remove: <T>(user: T) => Promise.resolve(user),
        patch: <T>(user: T) => Promise.resolve(user),
        deleteAll: (_class: any, ids: any[]) => Promise.resolve(y),
      };
      return x;
    }),
  };
});

const mockedService = mocked(DatabaseService, true);

let serv = UserService(mockedService());
console.log({ save: serv.save(new User()) });
console.log({ save: serv.getAll() });

// let userService = UserService(DatabaseService());

// console.log({ save: userService.save(new User()) });
// console.log(dbservice);
// console.log(dbservice());

describe('User Service Tests', () => {
  test.todo('getbyid');
  test.todo('getbyemail');
  test.todo('getByIdentity');
  test.todo('getAll');
  test.todo('createMany');
  test.todo('save');
  test.todo('patch');
  test.todo('create');
});

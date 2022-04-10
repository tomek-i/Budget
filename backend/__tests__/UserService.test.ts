import { mocked } from 'ts-jest/utils';
import { DatabaseService } from '../src/services/DatabaseService';
import { UserService } from '../src/services/UserService';

let x = jest.mock('../src/services/DatabaseService');

const dbservice = mocked(DatabaseService);
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

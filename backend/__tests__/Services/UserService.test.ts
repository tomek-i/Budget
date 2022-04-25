import { mocked } from 'ts-jest/utils';
import { DeleteResult } from 'typeorm';

// jest.mock('../src/services/DatabaseService', () => {
//   const originalModule = jest.requireActual('../src/services/DatabaseService');

//   return {
//     __esModule: true,
//     //...originalModule,

//     DatabaseService: jest.fn().mockImplementation(() => {
//       let y: DeleteResult = {
//         raw: '',
//         affected: 0,
//       };
//       let x: DatabaseServiceType = {
//         save: jest.fn().mockImplementation(() => {}), // <T>(user: T) => Promise.resolve(user),
//         getAll: jest.fn().mockImplementation(() => []), //<T>(user: T) => Promise.resolve([user]),
//         get: <T>(user: T) => Promise.resolve(user),
//         find: <T>(user: T) => Promise.resolve(user),
//         findOne: <T>(user: T) => Promise.resolve(user),
//         remove: <T>(user: T) => Promise.resolve(user),
//         patch: <T>(user: T) => Promise.resolve(user),
//         deleteAll: (_class: any, ids: any[]) => Promise.resolve(y),
//       };
//       return x;
//     }),
//   };
// });

// const mockedService = mocked(DatabaseService, true);

// let serv = UserService(mockedService());

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

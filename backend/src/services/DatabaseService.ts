import 'reflect-metadata';
import {
  Connection,
  createConnection,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  In,
  SaveOptions,
  UpdateResult,
} from 'typeorm';

const save = async <T extends unknown>(entity: T) => {
  return connection?.manager.save(entity)!;
};

const getAll = async <T extends unknown>(_class: any) => {
  return connection?.manager.find<T>(_class)!;
};

const get = async <T extends unknown>(_class: any, id: string) => {
  return connection?.manager.findOne<T>(_class, id)!;
};

const find = async <T extends unknown>(
  _class: any,
  options?: FindConditions<T>,
) => {
  return connection?.manager.find<T>(_class, options)!;
};

const findOne = async <T extends unknown>(
  _class: any,
  options?: FindConditions<T> | FindOneOptions<T>,
) => {
  return connection?.manager.findOne<T>(_class, options)!;
};
const remove = async <T extends unknown>(_class: any, criteria?: any) => {
  return connection?.manager.delete<T>(_class, criteria)!;
};

const patch = async <T extends unknown>(
  _class: any,
  data: any,
  criteria?: any,
) => {
  return connection?.manager.update(
    _class,
    { id: data.id, ...criteria },
    data,
  )!;
};

const deleteAll = async <T extends unknown>(_class: any, ids: any[]) => {
  return remove(_class, ids)!;
};

export type DatabaseServiceType = {
  save: <T extends unknown>(entity: T) => Promise<T>;
  getAll: <T extends unknown>(_class: any) => Promise<T[]>;
  get: <T extends unknown>(_class: any, id: string) => Promise<T | undefined>;
  find: <T extends unknown>(
    _class: any,
    options?: FindConditions<T> | undefined,
  ) => Promise<T[]>;
  findOne: <T extends unknown>(
    _class: any,
    options?: FindConditions<T> | FindOneOptions<T> | undefined,
  ) => Promise<T | undefined>;
  deleteAll: <T extends unknown>(
    _class: any,
    ids: any[],
  ) => Promise<DeleteResult>;
  remove: <T extends unknown>(
    _class: any,
    criteria?: any,
  ) => Promise<DeleteResult>;
  patch: <T extends unknown>(
    _class: any,
    data: any,
    criteria?: any,
  ) => Promise<UpdateResult>;
};

let connection: Connection | undefined = undefined;
export const DatabaseService = () => {
  console.log('DatabaseService() CALLED');
  if (!connection) {
    console.log('DB CONNECTION CALLED');
    createConnection()
      .then(async (conn) => {
        connection = conn;
      })
      .catch((error) => console.error(error));
  }
  return {
    save,
    getAll,
    get,
    find,
    findOne,
    deleteAll,
    remove,
    patch,
  };
};

import 'reflect-metadata';
import { Connection, createConnection, FindManyOptions, In } from 'typeorm';

let connection: Connection | undefined = undefined;

createConnection()
  .then(async (conn) => {
    connection = conn;
  })
  .catch((error) => console.log(error));

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
  options?: FindManyOptions<T>,
) => {
  return connection?.manager.find<T>(_class, options)!;
};

const findOne = async <T extends unknown>(
  _class: any,
  options?: FindManyOptions<T>,
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
  return connection?.manager.update(_class, criteria, data)!;
};

const deleteAll = async <T extends unknown>(_class: any, ids: any[]) => {
  return remove(_class, ids)!;
};

export const DatabaseService = {
  save,
  getAll,
  get,
  find,
  findOne,
  deleteAll,
  remove,
  patch,
};

import 'reflect-metadata';
import { Connection, createConnection, FindManyOptions } from 'typeorm';

let connection: Connection | undefined = undefined;

createConnection()
  .then(async (conn) => {
    connection = conn;
  })
  .catch((error) => console.log(error));

const save = <T extends unknown>(entity: T) => {
  return connection?.manager.save(entity);
};

const getAll = <T extends unknown>(
  _class: any,
  options?: FindManyOptions<T>,
) => {
  return connection?.manager.find<T>(_class, options);
};

const get = <T extends unknown>(_class: any, id: string) => {
  return connection?.manager.findOne<T>(_class, id);
};

const find = <T extends unknown>(_class: any, options?: FindManyOptions<T>) => {
  return connection?.manager.find<T>(_class, options);
};

const findOne = <T extends unknown>(
  _class: any,
  options?: FindManyOptions<T>,
) => {
  return connection?.manager.findOne<T>(_class, options);
};

export const DatabaseService = {
  save,
  getAll,
  get,
  find,
  findOne,
};

import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { DatabaseSeedService } from "./DatabaseSeederService";

let connection: Connection | undefined = undefined;

createConnection()
  .then(async (conn) => {
    connection = conn;
    // console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch((error) => console.log(error));

const save = <T extends unknown>(entity: T) => {
  return connection?.manager.save(entity);
};
const getAll = (_class: any) => {
  return connection?.manager.find(_class);
};

const get = <T extends unknown>(_class: any, id: number) => {
  return connection?.manager.findOne<T>(_class, id);
};
export const DatabaseService = {
  save,
  getAll,
  get,
};

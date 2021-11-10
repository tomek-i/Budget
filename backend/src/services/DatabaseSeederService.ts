import { Category } from '../entity/Category';
import { User } from '../entity/User';
import { DatabaseService } from './DatabaseService';
import { readFile } from 'fs/promises';
import path from 'path';

const SEED_FOLDER = '..\\..\\tools\\seed';

const seed = async () => {
  console.log('Seeding the database...');
  const seedUsers = getPromise(async () => {
    let data = await parseSeedJsonFile(User);
    await DatabaseService.save(data);
    return `Saved ${data.length} users to the database`;
  });
  const seedCategories = getPromise(async () => {
    let data = await parseSeedJsonFile(Category);
    await DatabaseService.save(data);
    return `Saved ${data.length} categories to the database`;
  });
  console.log(await Promise.all([seedUsers, seedCategories]));
};

/**
 * wraps the callback in a try/catch promise
 * @param cb callback to execute
 * @returns
 */
const getPromise = (cb: Function) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(cb());
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * Loads dynamicly based on the the class type the corresponding json file.
 *
 * @example
 * parseSeedJsonFile(User) //the will load a user.json file
 *
 * @param type the Entity type
 * @returns an array of the Entity type
 */
const parseSeedJsonFile = async <T extends unknown>(type: { new (): T }) => {
  let objs = JSON.parse(
    await readFile(
      path.join(__dirname, SEED_FOLDER, `${type.name.toLowerCase()}.json`),
      'utf8',
    ),
  );
  return objs.map((data: any) => {
    const obj = new type();
    Object.assign(obj, data);
    return obj;
  }) as T[];
};
export const DatabaseSeedService = {
  seed,
};

import path from 'path';
import { Category } from '../entity/Category';
import { User } from '../entity/User';
import { DatabaseService } from './DatabaseService';
import { readFile } from 'fs/promises';
import { UserService } from './UserService';

const SEED_FOLDER = '..\\..\\tools\\seed';

const clearUsers = async () => {
  const users = await DatabaseService.getAll<User>(User);
  if (users.length > 0) {
    const ids = users.map((x) => x.id);
    console.log('Deleting all users.');
    return DatabaseService.deleteAll(User, ids);
  }
};

const clearCategories = async () => {
  const categories = await DatabaseService.getAll<Category>(Category);
  if (categories.length > 0) {
    const ids = categories.map((x) => x.id);
    console.log('Deleting all categories.');
    return DatabaseService.deleteAll(Category, ids);
  }
};

const seed = async () => {
  await Promise.all([clearUsers(), clearCategories()]);

  console.log('Seeding the database...');
  const seedUsers = getPromise(async () => {
    const data = await parseSeedJsonFile(User);
    UserService.createMany(data);
    //await DatabaseService.save(data);
    return `Saved ${data.length} users to the database`;
  });

  const seedCategories = getPromise(async () => {
    let data = await parseSeedJsonFile(Category);
    for (const category of data) {
      if (category.icon) {
        let iconPath = path.join(__dirname, SEED_FOLDER, category.icon);
        try {
          let base64 = await readFile(iconPath, 'base64');
          category.icon = `data:image/svg+xml;${base64}`;
        } catch (error) {
          console.error(error);
        }
      }
    }

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
  clearUsers,
  clearCategories,
};

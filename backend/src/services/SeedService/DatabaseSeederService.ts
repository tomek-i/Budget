import path from 'path';
import { Category } from '../../entity/Category';
import { User } from '../../entity/User';
import { readFile } from 'fs/promises';
import { UserService } from '../UserService';
import { AppDataSource } from '../DatabaseService';
import { CategoryService } from '../CategoryService';

const SEED_FOLDER = '..\\..\\..\\tools\\seed';

const userService = new UserService(AppDataSource.getRepository(User));
const categoryService = new CategoryService(
  AppDataSource.getRepository(Category),
);

const clearUsers = async () => {
  const users = await userService.getAll();
  if (users.length > 0) {
    const ids = users.map((x) => x.id);
    return userService.deleteAll(ids);
  }
};

const clearCategories = async () => {
  const categories = await categoryService.getAll();
  if (categories.length > 0) {
    const ids = categories.map((x) => x.id);
    return categoryService.deleteAll(ids);
  }
};

/**
 * Will delete all entity tables before re-seeding them.
 */
const seed = async () => {
  await Promise.all([clearUsers(), clearCategories()]);

  const seedUsers = getPromise(async () => {
    const data = await parseSeedJsonFile(User);
    const createManyUserLg = await userService.createMany(data);
    console.log({ createManyUserLg });
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
        } catch (error) {}
      }
    }

    const createManyCategoryLg = await categoryService.createMany(data);
    console.log({ createManyCategoryLg });
    return `Saved ${data.length} categories to the database`;
  });
  await Promise.all([seedUsers, seedCategories]);
};

const seedUsers = async () => {
  return getPromise(async () => {
    const data = await parseSeedJsonFile(User);
    await userService.createMany(data);
    return `Saved ${data.length} users to the database`;
  });
};

const seedCategories = async () => {
  return getPromise(async () => {
    let data = await parseSeedJsonFile(Category);
    for (const category of data) {
      if (category.icon) {
        let iconPath = path.join(__dirname, SEED_FOLDER, category.icon);
        try {
          let base64 = await readFile(iconPath, 'base64');
          category.icon = `data:image/svg+xml;${base64}`;
        } catch (error) {}
      }
    }

    const createManyCategoryLg = await categoryService.createMany(data);
    console.log({ createManyCategoryLg });
    return `Saved ${data.length} categories to the database`;
  });
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
    const obj: any = new type();
    Object.assign(obj, data);
    return obj;
  }) as T[];
};
export const DatabaseSeedService = {
  seed,
  seedUsers,
  seedCategories,
  clearUsers,
  clearCategories,
};

import { Category } from '../../entity/Category';
// import { DatabaseService } from '../DatabaseService/DatabaseService';
import { CategoryType } from '../../../../common/types/category.type';
import { FindManyOptions } from 'typeorm';

const getById = async (id: string): Promise<Category | undefined> => {
  // return DatabaseService().get<Category>(Category, id);
  return undefined;
};
const getAll = async (
  options?: FindManyOptions<Category>,
): Promise<Category[] | undefined> => {
  // return DatabaseService().getAll(Category);
  return undefined;
};

const create = async (data: CategoryType): Promise<Category | undefined> => {
  // return DatabaseService().save({
  //   id: '',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   ...data,
  // } as Category);
  return undefined;
};

export const CategoryService = { getById, create, getAll };
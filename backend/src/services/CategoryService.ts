import { Category } from '../entity/Category';
import { DatabaseService } from './DatabaseService';
import { CategoryType } from '../../../common/types/category.type';

const getById = async (id: string): Promise<Category | undefined> => {
  return DatabaseService.get<Category>(Category, id);
};
const getAll = async (): Promise<Category[] | undefined> => {
  return DatabaseService.getAll(Category);
};

const create = async (data: CategoryType): Promise<Category | undefined> => {
  return DatabaseService.save({
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data,
  } as Category);
};

export const CategoryService = { getById, create, getAll };

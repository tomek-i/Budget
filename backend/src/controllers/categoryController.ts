import { Get, Route, Tags } from 'tsoa';
import { Category } from '../entity/Category';
import { CategoryService } from '../services/CategoryService/CategoryService';

@Route('api/categories')
@Tags('Category')
export class CategoryController {
  @Get('/')
  public async getAll(): Promise<Category[]> {
    let result = await CategoryService.getAll({ relations: ['transactions'] });
    if (!result) throw new Error('Could not fetch categories.');
    return result;
  }
}

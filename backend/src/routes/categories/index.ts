import { Router } from 'express';
import { CategoryController } from '../../controllers/categoryController';

export const CategoryRoutes = Router();

// URL: ./categeories/
CategoryRoutes.get('/', async (req, res) => {
  const controller = new CategoryController();

  let resuls = await controller.getAll();

  let imgs = '';
  resuls.map((item) => {
    if (item.icon)
      imgs += `<img width="50" src=${item.icon} alt="${item.title}" />`;
  });

  res.send(imgs);
});

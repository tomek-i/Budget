import { Router, Request, Response } from 'express';
import { CategoryController } from '../controllers/CategoryController';

export const CategoryRoutes = Router();

// URL: ./categeories/
CategoryRoutes.get('/', async (req: Request, res: Response) => {
  const controller = new CategoryController();
  let results = await controller.getAll();

  // let imgs = '';

  // resuls.map((item) => {
  //   if (item.icon)
  //     imgs += `<img width="50" src=${item.icon} alt="${item.title}" />`;
  // });

  // res.send(imgs);
  res.json(results);
});

CategoryRoutes.get('/:id', async (req: Request, res: Response) => {
  res.send('TODO');
});

//creates a new one
CategoryRoutes.post('/', async (req: Request, res: Response) => {
  res.send('TODO');
});

//applies partial modification
CategoryRoutes.patch('/:id', async (req: Request, res: Response) => {
  res.send('TODO');
});
//replaces all (eg all properties are to be filled out or if not passed through default values are being used?)
CategoryRoutes.put('/:id', async (req: Request, res: Response) => {
  res.send('TODO');
});
//eg can be just send a single attribute like {name:"new name"}
CategoryRoutes.delete('/:id', async (req: Request, res: Response) => {
  res.send('TODO');
});

CategoryRoutes.head('/:id', async (req: Request, res: Response) => {
  res.send('TODO');
});
CategoryRoutes.get('/:id/transactions', async (req: Request, res: Response) => {
  res.send('TODO');
});

//LINK - This method link one object to another object. Basically establish an relationship between two entity/object
//so that would assign a category to a transaction or transactions to categories

//UNLINK - This method unlink one object to another object. remove relationship between objects.
//the reverse from above

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: ['src/entity/**/*.ts'],
  // entities: [path.resolve(__dirname + '../../../entity/*.ts')],
});

AppDataSource.initialize()
  .then(() => {
    if (process.env.NODE_ENV !== 'test')
      console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

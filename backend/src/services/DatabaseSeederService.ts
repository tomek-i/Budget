import { User } from '../entity/User';
import { DatabaseService } from './DatabaseService';

const seed = async () => {
  console.log('Inserting a new user into the database...');
  const user = new User();
  user.firstName = 'Timber';
  user.lastName = 'Saw';
  user.email = 'test@example.com';
  user.username = 'bakradabra';
  user.age = 25;
  await DatabaseService.save<User>(user);
  console.log('Saved a new user with id: ' + user.id);
};

export const DatabaseSeedService = {
  seed,
};

import { User } from '../../entity/User';
import { Service } from '../Service';

//@ProvideSingleton(UserService)
export class UserService extends Service<User> {
  getById(id: string) {
    if (!id) throw Error('Invalid id provided.');
    return this.repository.findOneBy({ id });
  }
  getByEmail(email: string) {
    if (!email) throw Error('Invalid email provided');
    return this.repository.findOneBy({ email });
  }
}

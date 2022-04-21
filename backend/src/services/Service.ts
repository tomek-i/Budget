import { Repository } from 'typeorm';
import { ObjectLiteral } from '../types/entity';

export class Service<T extends ObjectLiteral> {
  repository: Repository<T>;

  //@inject(UserRepository) private userRepository: UserRepository
  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  getAll() {
    return this.repository.find();
  }
  get(id: string) {}
  create(entity: T) {
    if (!entity) throw Error('Invalid entity');
    return this.repository.save(entity);
  }

  update(entity: T) {
    if (!(entity && entity.id)) throw Error('Invalid Entity');
    return this.repository.update(entity.id, entity);
  }

  delete(entity: T) {
    if (!(entity && entity.id)) throw Error('Invalid Entity');
    return this.repository.delete(entity.id);
  }
}

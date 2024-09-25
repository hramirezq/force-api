import { PeopleEntity } from '../entities/PeopleEntity';

export interface PeopleRepository {
  save(people: PeopleEntity): Promise<void>;
  findById(id: string): Promise<PeopleEntity | null>;
}

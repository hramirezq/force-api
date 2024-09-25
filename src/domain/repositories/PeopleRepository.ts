import { PeopleEntity } from '../entities/PeopleEntity';

export interface PeopleRepository {
  save(people: PeopleEntity): Promise<void>;
  findByUuid(id: string): Promise<PeopleEntity | null>;
  findById(id: number): Promise<PeopleEntity | null>;
  findAll(): Promise<Array<PeopleEntity> | null>;
}

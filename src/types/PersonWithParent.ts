import { Person } from './Person';

export interface PersonWithParents extends Person {
  motherPerson: Person | null;
  fatherPerson: Person | null;
}

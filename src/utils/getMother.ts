import { Person } from '../types';
import { GENDER_FEMALE } from './vars';

export function getMother(persons: Person[], person: Person) {
  return persons.find((mother) => mother.sex === GENDER_FEMALE
  && mother.name === person.motherName);
}

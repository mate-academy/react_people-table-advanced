import { Person } from '../types';
import { GENDER_MALE } from './vars';

export function getFather(persons: Person[], person: Person) {
  return persons.find((father) => father.sex === GENDER_MALE
  && father.name === person.fatherName);
}

import { Person } from '../types';
import { Sex } from '../types/Sex';

export const filterBySex = (people: Person[], sex: Sex): Person[] =>
  people.filter(person => person.sex === sex);

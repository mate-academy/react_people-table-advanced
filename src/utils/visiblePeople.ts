import { Person } from '../types';
import { getParent } from './parents';

export const getVisiblePeople = (people: Person[] | []): Person[] | [] => (
  people?.map((person) => ({
    ...person,
    father: getParent(people, person.fatherName),
    mother: getParent(people, person.motherName),
  }))
);

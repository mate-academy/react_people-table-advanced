import { Person } from '../types';
import { getFather, getMother } from './parents';

export const getVisiblePeople = (people: Person[] | []): Person[] | [] => (
  people?.map((person) => ({
    ...person,
    father: getFather(people, person),
    mother: getMother(people, person),
  }))
);

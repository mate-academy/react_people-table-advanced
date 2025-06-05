import { Person } from '../types';
import { combineFilter, filterByString } from './filtres';

const filterByCentury = (centuries: string[]) => (person: Person) => {
  const century = Math.ceil(person.died / 100);

  return !centuries.length ? true : centuries.includes(`${century}`);
};

const filterBySex = (sex: string) => (person: Person) =>
  sex ? person.sex === sex : true;

const filterByName = (queryName: string) =>
  filterByString<Person>(queryName, ['name', 'motherName', 'fatherName']);

const combinedFilter =
  (sex: string, centuries: string[], name: string) =>
  (...args: [Person, number, Person[]]) =>
    combineFilter(
      filterBySex(sex),
      filterByCentury(centuries),
      filterByName(name),
    )(...args);

export const getFilteredPeople = (
  people: Person[],
  sex: string,
  name: string,
  centuries: string[],
) => people.filter(combinedFilter(sex, centuries, name));

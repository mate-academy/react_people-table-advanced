import { Person } from '../types';
import { sortPeople } from './sortPeople';

export function clearPeopleList(
  people: Person[],
  centuries: string[],
  sex: string | null,
  query: string | null,
  sort: string | null,
  order: string | null,
) {
  const visiblePeople = people.filter(
    person =>
      (!sex || person.sex === sex) &&
      (person.name.includes(query || '') ||
        person.motherName?.includes(query || '') ||
        person.fatherName?.includes(query || '')) &&
      (!centuries.length ||
        centuries.includes(Math.ceil(person.born / 100).toString())),
  );

  const sortedPeople = sort
    ? sortPeople(sort, order, visiblePeople)
    : visiblePeople;

  return sortedPeople;
}

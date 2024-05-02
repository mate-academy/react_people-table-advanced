import { Person } from '../types';
import { Status } from '../types/sortGender';
import { SortType } from '../types/sortTypes';

export function sortTable(
  people: Person[],
  query: string,
  centuries: string[],
  sex: Status,
  sort: SortType,
  order: string,
) {
  let sortedPeople = [...people];

  if (query) {
    sortedPeople = sortedPeople.filter(person =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuries && !!centuries.length) {
    sortedPeople = sortedPeople.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sex !== Status.All) {
    sortedPeople = sortedPeople.filter(person => person.sex === sex);
  }

  switch (sort) {
    case 'name':
    case 'sex':
      sortedPeople = sortedPeople.sort((personA, personB) =>
        personA.name.localeCompare(personB.name),
      );

      break;

    case 'born':
    case 'died':
      sortedPeople = sortedPeople.sort(
        (personA, personB) => personA[sort] - personB[sort],
      );

      break;

    default:
      return sortedPeople;
  }

  if (order) {
    return sortedPeople.reverse();
  }

  return sortedPeople;
}

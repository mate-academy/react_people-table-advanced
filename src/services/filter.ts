import { Person } from '../types';
import { SortType } from '../types/SortType';

export function filterPeople(
  people: Person[],
  query: string,
  centuries: string[],
  sex: string,
  sort: string,
  order: string,
) {
  let filteredPeople = [...people];

  if (query) {
    filteredPeople = filteredPeople.filter(person =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuries && centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sex === 'f') {
    filteredPeople = filteredPeople.filter(person => person.sex === 'f');
  } else if (sex === 'm') {
    filteredPeople = filteredPeople.filter(person => person.sex === 'm');
  }

  switch (true) {
    case sort === SortType.Born && order === 'desc':
      filteredPeople = filteredPeople.sort(
        (personA, personB) => personB.born - personA.born,
      );

      break;
    case sort === SortType.Born && !order:
      filteredPeople = filteredPeople.sort(
        (personA, personB) => personA.born - personB.born,
      );

      break;
    case sort === SortType.Died && order === 'desc':
      filteredPeople = filteredPeople.sort(
        (personA, personB) => personB.born - personA.born,
      );

      break;
    case sort === SortType.Died && !order:
      filteredPeople = filteredPeople.sort(
        (personA, personB) => personA.born - personB.born,
      );

      break;
    case sort === SortType.Sex && order === 'desc':
      filteredPeople = filteredPeople.sort((personA, personB) =>
        personB.sex.localeCompare(personA.sex),
      );

      break;
    case sort === SortType.Sex && !order:
      filteredPeople = filteredPeople.sort((personA, personB) =>
        personA.sex.localeCompare(personB.sex),
      );

      break;
    case sort === SortType.Name && !order:
      filteredPeople = filteredPeople.sort((personA, personB) =>
        personA.name.localeCompare(personB.name),
      );

      break;
    case sort === SortType.Name && order === 'desc':
      filteredPeople = filteredPeople.sort((personA, personB) =>
        personB.name.toLowerCase().localeCompare(personA.name.toLowerCase()),
      );

      break;

    default:
      return filteredPeople;
  }

  return filteredPeople;
}

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

  if (centuries && !!centuries.length) {
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
    case sort === SortType.Name && !order:
      return (filteredPeople = filteredPeople.sort((personA, personB) =>
        personA.name.localeCompare(personB.name),
      ));

    case sort === SortType.Name && order === 'desc':
      return (filteredPeople = filteredPeople.sort((personA, personB) =>
        personB.name.toLowerCase().localeCompare(personA.name.toLowerCase()),
      ));

    case sort === SortType.Sex && !order:
      return (filteredPeople = filteredPeople.sort((personA, personB) =>
        personA.sex.localeCompare(personB.sex),
      ));

    case sort === SortType.Sex && order === 'desc':
      return (filteredPeople = filteredPeople.sort((personA, personB) =>
        personB.sex.localeCompare(personA.sex),
      ));

    case sort === SortType.Born && !order:
      return (filteredPeople = filteredPeople.sort(
        (personA, personB) => personA.born - personB.born,
      ));

    case sort === SortType.Born && order === 'desc':
      return (filteredPeople = filteredPeople.sort(
        (personA, personB) => personB.born - personA.born,
      ));

    case sort === SortType.Died && !order:
      return (filteredPeople = filteredPeople.sort(
        (personA, personB) => personA.died - personB.died,
      ));

    case sort === SortType.Died && order === 'desc':
      return (filteredPeople = filteredPeople.sort(
        (personA, personB) => personB.died - personA.died,
      ));

    default:
      return filteredPeople;
  }
}

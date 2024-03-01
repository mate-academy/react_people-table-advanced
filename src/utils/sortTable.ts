import { Person } from '../types';

export function sortTable(
  people: Person[],
  query: string,
  centuries: string[],
  sex: string,
  sort: string,
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

  if (sex === 'm') {
    sortedPeople = sortedPeople.filter(person => person.sex === 'm');
  } else if (sex === 'f') {
    sortedPeople = sortedPeople.filter(person => person.sex === 'f');
  }

  switch (true) {
    case sort === 'name' && !order:
      sortedPeople = sortedPeople.sort((personA, personB) =>
        personA.name.localeCompare(personB.name),
      );

      break;

    case sort === 'name' && order:
      sortedPeople = sortedPeople.sort((personA, personB) =>
        personA.name.localeCompare(personB.name),
      );

      break;

    case sort === 'sex' && !order:
      sortedPeople = sortedPeople.sort((personA, personB) =>
        personA.sex.localeCompare(personB.sex),
      );

      break;

    case sort === 'sex' && order:
      sortedPeople = sortedPeople.sort((personA, personB) =>
        personB.sex.localeCompare(personA.sex),
      );

      break;

    case sort === 'born' && !order:
      sortedPeople = sortedPeople.sort(
        (personA, personB) => personA.born - personB.born,
      );

      break;

    case sort === 'born' && order:
      sortedPeople = sortedPeople.sort(
        (personA, personB) => personB.born - personA.born,
      );

      break;

    case sort === 'died' && !order:
      sortedPeople = sortedPeople.sort(
        (personA, personB) => personA.died - personB.died,
      );

      break;

    case sort === 'died' && order:
      sortedPeople = sortedPeople.sort(
        (personA, personB) => personB.died - personA.died,
      );

      break;

    default:
      return sortedPeople;
  }

  return sortedPeople;
}

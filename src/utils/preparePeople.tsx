import { Person } from '../types';
import { SortFieldPrepare } from '../types/SortFieldPrepare';

export function preparePeople(
  query: string,
  centuries: string[],
  sex: string,
  normalizedPeople: Person[],
  sort: string,
  order: string,
) {
  let preparingPeople = [...normalizedPeople];

  if (query) {
    preparingPeople = preparingPeople
      .filter(person => person.name.toLowerCase()
        .includes(query)
        || person.mother?.name.toLowerCase().includes(query)
        || person.father?.name.toLowerCase().includes(query));
  }

  if (centuries.length) {
    preparingPeople = preparingPeople
      .filter(person => centuries
        .includes((Math.ceil(person.born / 100)).toString()));
  }

  if (sex) {
    preparingPeople = preparingPeople.filter(person => {
      switch (sex) {
        case 'f':
          return person.sex === 'f';

        case 'm':
          return person.sex === 'm';

        default:
          return true;
      }
    });
  }

  if (sort) {
    preparingPeople = preparingPeople.sort((person1, person2) => {
      const normalizedSort = sort
        .toLowerCase() as SortFieldPrepare;

      switch (typeof person1[normalizedSort]) {
        case 'string': {
          return (person1[normalizedSort] as string)
            .localeCompare(person2[normalizedSort] as string);
        }

        case 'number': {
          return +person1[normalizedSort] - +person2[normalizedSort];
        }

        default: {
          return 0;
        }
      }
    });
  }

  if (order) {
    preparingPeople.reverse();
  }

  return preparingPeople;
}

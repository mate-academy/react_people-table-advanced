import { Person } from '../types';
import { SortFieldPrepare } from '../types/SortFieldForMap';

export function preparePeople(
  query: string,
  centuries: string[],
  sex: string,
  normalizedPeople: Person[],
  sort: SortFieldPrepare,
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
    preparingPeople.sort((person1, person2) => {
      switch (typeof person1[sort]) {
        case 'string':
          return (person1[sort] as string)
            .localeCompare(person2[sort] as string);

        case 'number':
          return +person1[sort] - +person2[sort];
        default:
          return 0;
      }
    });
  }

  if (order) {
    preparingPeople.reverse();
  }

  return preparingPeople;
}

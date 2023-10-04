import { PersonType } from '../types';
import { SortTypes } from './constats';

export const getSortedPeople = (
  people: PersonType[],
  sex: string | null,
  query: string,
  centuries: string[],
  sortType: string | null,
  order: string | null,
) => {
  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => (
      person.sex === sex
    ));
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    visiblePeople = visiblePeople.filter(person => (
      person.name.toLowerCase().includes(normalizedQuery)
      || person.fatherName?.toLowerCase().includes(normalizedQuery)
      || person.motherName?.toLowerCase().includes(normalizedQuery)
    ));
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(
      ({ born }) => centuries.includes((Math.ceil(born / 100)).toString()),
    );
  }

  if (sortType) {
    visiblePeople.sort((personA, personB) => {
      switch (sortType) {
        case SortTypes.Name:
          return personA.name.localeCompare(personB.name);

        case SortTypes.Sex:
          return personA.sex.localeCompare(personB.sex);

        case SortTypes.Born:
          return personA.born - personB.born;

        case SortTypes.Died:
          return personA.died - personB.died;

        default:
          return 0;
      }
    });
  }

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};

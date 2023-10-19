import { PersonType } from '../types';
import { CENTURY, SortTypes } from './constats';

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
      ({ born }) => centuries.includes((Math.ceil(born / CENTURY)).toString()),
    );
  }

  if (sortType) {
    visiblePeople.sort((a, b) => {
      switch (sortType) {
        case SortTypes.Name:
          return a.name.localeCompare(b.name);

        case SortTypes.Sex:
          return a.sex.localeCompare(b.sex);

        case SortTypes.Born:
          return a.born - b.born;

        case SortTypes.Died:
          return a.died - b.died;

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

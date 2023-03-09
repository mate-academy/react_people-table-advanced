import { Person } from '../types';
import { SortPeople } from './SortPeople';

export const getVisiblePeople = (
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sort: string,
  order: string,
): Person[] => {
  let visiblePeople = [...people];

  if (query) {
    visiblePeople = visiblePeople.filter(
      person => {
        const allSearchField
          = person.name + person.motherName + person.fatherName;

        return allSearchField
          .toLowerCase().includes(query.toLowerCase());
      },
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length !== 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = String(Math.ceil(person.born / 100));

      return centuries.includes(century);
    });
  }

  if (sort) {
    visiblePeople = visiblePeople.sort((p1, p2) => {
      switch (sort) {
        case SortPeople.Name:
        case SortPeople.Sex:
          return p1[sort].localeCompare(p2[sort]);

        case SortPeople.Born:
        case SortPeople.Died:
          return p1[sort] - p2[sort];

        default:
          return 0;
      }
    });
  }

  if (order) {
    visiblePeople = visiblePeople.reverse();
  }

  return visiblePeople;
};

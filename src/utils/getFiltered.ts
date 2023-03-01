import { Person } from '../types';
import { SexFilterType } from '../types/SexFilterType';
import { SortType } from '../types/SortType';

export const getFiltered = (
  sex: string,
  centuries: string[],
  query: string,
  people: Person[],
  sort: string | null,
  order: string | null,
) => {
  let filteredPeople = [...people];

  if (sort) {
    filteredPeople.sort((p1, p2) => {
      switch (sort) {
        case SortType.Name:
        case SortType.Sex:
          return p1[sort].localeCompare(p2[sort]);

        case SortType.Born:
        case SortType.Died:
          return p1[sort] - p2[sort];

        default:
          return 0;
      }
    });
  }

  if (order) {
    filteredPeople.reverse();
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => {
      switch (sex) {
        case SexFilterType.Female:
          return person.sex === 'f';

        case SexFilterType.Male:
          return person.sex === 'm';

        default:
          return true;
      }
    });
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(
      person => centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  if (query) {
    const lowerQuery = query.toLowerCase();

    filteredPeople = filteredPeople.filter(
      ({ name, fatherName, motherName }) => (
        name.toLowerCase().includes(lowerQuery)
        || fatherName?.toLowerCase().includes(lowerQuery)
        || motherName?.toLowerCase().includes(lowerQuery)
      ),
    );
  }

  return filteredPeople;
};

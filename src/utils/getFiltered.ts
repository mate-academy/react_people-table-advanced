import { Params } from './getSearchWith';
import { Person } from '../types';
import { SortType } from '../types/SortType';

export function getFiltered(
  people: Person[],
  {
    query,
    sexFilter,
    centuries,
    sort,
    order,
  }: Params,
) {
  let filteredPeople = [...people];

  if (sexFilter) {
    filteredPeople = filteredPeople.filter(person => {
      return person.sex === sexFilter;
    });
  }

  if (query && typeof query === 'string') {
    const correctQuery = query.trim().toLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      return (
        person.name.toLowerCase().includes(correctQuery)
        || person.motherName?.toLowerCase().includes(correctQuery)
        || person.fatherName?.toLowerCase().includes(correctQuery)
      );
    });
  }

  if (centuries
    && Array.isArray(centuries)
    && centuries.length !== 0) {
    const correctCentury = centuries.map(century => +century);

    filteredPeople = filteredPeople.filter(person => {
      const bornCentury = Math.floor(person.born / 100) + 1;

      return correctCentury.includes(bornCentury);
    });
  }

  if (sort) {
    filteredPeople = filteredPeople.sort((person1, person2) => {
      switch (sort) {
        case SortType.NAME:
        case SortType.SEX:
          return person1[sort].localeCompare(person2[sort]);

        case SortType.BORN:
        case SortType.DIED:
          return person1[sort] - person2[sort];

        default:
          return 0;
      }
    });
  }

  if (order) {
    filteredPeople = filteredPeople.reverse();
  }

  return filteredPeople;
}

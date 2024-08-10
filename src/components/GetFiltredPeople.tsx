import { Person } from '../types';
import { Sort } from '../types/Sort';

interface FilterParams {
  sex: string | null;
  query: string | null;
  centuries: string[];
  sortField: string | null;
  order: boolean;
}

export function getFilteredPeople(
  people: Person[],
  { sex, query, centuries, sortField, order }: FilterParams,
) {
  let preparedList = [...people];

  if (sex) {
    preparedList = preparedList.filter(person => {
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

  if (query) {
    preparedList = preparedList.filter(
      person =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuries.length > 0) {
    preparedList = preparedList.filter(person => {
      const personCentury = Math.ceil(+person.born / 100);

      return centuries.includes(`${personCentury}`);
    });
  }

  if (sortField) {
    preparedList = preparedList.sort((person1, person2) => {
      switch (sortField) {
        case Sort.Name:
        case Sort.Sex:
          return person1[sortField].localeCompare(person2[sortField]);
        case Sort.Born:
        case Sort.Died:
          return +person1[sortField] - +person2[sortField];
        default:
          return 0;
      }
    });
  }

  if (order) {
    preparedList.reverse();
  }

  return preparedList;
}

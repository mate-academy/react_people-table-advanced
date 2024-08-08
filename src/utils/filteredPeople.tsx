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
    preparedList = preparedList.filter(person => person.sex === sex);
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
      const value1 = person1[sortField as keyof Person];
      const value2 = person2[sortField as keyof Person];

      switch (sortField) {
        case Sort.Name:
        case Sort.Sex:
          return (value1 as string).localeCompare(value2 as string);
        case Sort.Born:
        case Sort.Died:
          return (Number(value1) || 0) - (Number(value2) || 0);
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

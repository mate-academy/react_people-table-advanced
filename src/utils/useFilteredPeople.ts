import { FilterBy } from '../types/FilterBy';
import { Person } from '../types/Person';
import { SexType } from '../types/SexType';
import { usePeopleSearchParams } from './usePeopleSearchParams';

export function useFilteredPeople(people: Person[]) {
  const { sex, query, centuries, sortField, order } = usePeopleSearchParams();

  let preparedList = [...people];

  if (sex) {
    preparedList = preparedList.filter(person => {
      switch (sex) {
        case SexType.female:
          return person.sex === 'f';
        case SexType.male:
          return person.sex === 'm';

        default:
          return SexType.all;
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
        case FilterBy.name:
        case FilterBy.sex:
          return person1[sortField].localeCompare(person2[sortField]);

        case FilterBy.born:
        case FilterBy.died:
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

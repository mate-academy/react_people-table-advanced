import { Person } from '../types';
import { SexFilter, SexFilterTypeValues } from '../types/FilterTypes';
import { SortTypesValues, SortTypes } from '../types/SortTypes';

export function getVisiblePeople(
  people: Person[],
  sex: SexFilterTypeValues,
  centuries: string[],
  query: string,
  sort: SortTypesValues,
  order: string | null,
) {
  let peopleCopy = [...people];

  if (sex) {
    switch (sex) {
      case SexFilter.Female:
        peopleCopy = peopleCopy.filter(
          person => person.sex === SexFilter.Female,
        );
        break;
      case SexFilter.Male:
        peopleCopy = peopleCopy.filter(person => person.sex === SexFilter.Male);
        break;
    }
  }

  if (centuries.length > 0) {
    peopleCopy = peopleCopy.filter(person => {
      const birthCentury = `${Math.ceil(person.born / 100)}`;

      return centuries.includes(birthCentury);
    });
  }

  if (query.trim()) {
    peopleCopy = peopleCopy.filter(person => {
      return (
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  const direction = order === 'desc' ? -1 : 1;

  if (sort) {
    switch (sort) {
      case SortTypes.Name:
      case SortTypes.Sex:
        peopleCopy = [...peopleCopy].sort(
          (per1, per2) => per1[sort].localeCompare(per2[sort]) * direction,
        );
        break;

      case SortTypes.Born:
      case SortTypes.Died:
        peopleCopy = [...peopleCopy].sort(
          (per1, per2) => (per1[sort] - per2[sort]) * direction,
        );
        break;
    }
  }

  return peopleCopy;
}

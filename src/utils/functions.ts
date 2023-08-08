import { Person } from '../types';
import { FilterParams } from '../types/FilterParams';
import { SortColumns } from './SortColumns';

function sortPeopleBy(
  people: Person[],
  sortFilter: SortColumns,
  isOrderReversed: boolean,
): Person[] {
  const peopleResult = people;

  switch (sortFilter) {
    case (SortColumns.NAME): {
      peopleResult.sort((person1: Person, person2: Person) => {
        return person1[SortColumns.NAME]
          .localeCompare(person2[SortColumns.NAME]);
      });

      break;
    }

    case (SortColumns.SEX): {
      peopleResult.sort((person1: Person, person2: Person) => {
        return person1[SortColumns.SEX]
          .localeCompare(person2[SortColumns.SEX]);
      });

      break;
    }

    case (SortColumns.BORN): {
      peopleResult.sort((person1: Person, person2: Person) => {
        return person1[SortColumns.BORN] - (person2[SortColumns.BORN]);
      });

      break;
    }

    case (SortColumns.DIED): {
      peopleResult.sort((person1: Person, person2: Person) => {
        return person1[SortColumns.DIED] - (person2[SortColumns.DIED]);
      });

      break;
    }

    default:
      break;
  }

  if (isOrderReversed) {
    peopleResult.reverse();
  }

  return peopleResult;
}

export function filterPeople(people: Person[], {
  queryFilter,
  centuryFilter,
  sexFilter,
  sortFilter,
  sortOrder,
}: FilterParams) {
  let peopleCopy = [...people];

  if (queryFilter) {
    const normalizedQuery = queryFilter.toLowerCase();

    peopleCopy = peopleCopy.filter(person => {
      const normalizedName = person.name.toLowerCase();
      const normalizedMother = person.motherName?.toLowerCase() || '';
      const normalizedFather = person.fatherName?.toLowerCase() || '';

      return normalizedName.includes(normalizedQuery)
        || normalizedMother.includes(normalizedQuery)
        || normalizedFather.includes(normalizedQuery);
    });
  }

  if (centuryFilter && centuryFilter.length) {
    peopleCopy = peopleCopy.filter(person => {
      const currentCentury = Math.floor(person.born / 100) + 1;

      return centuryFilter.includes(currentCentury.toString());
    });
  }

  if (sexFilter) {
    peopleCopy = peopleCopy.filter(person => {
      return person.sex === sexFilter?.toString();
    });
  }

  if (sortFilter) {
    peopleCopy = sortPeopleBy(
      peopleCopy,
      sortFilter as SortColumns,
      sortOrder === 'desc',
    );
  }

  return peopleCopy;
}

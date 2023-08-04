import { Person } from '../types';
import { SortColumns } from './SortColumns';
import { SortOrders } from './SortOrders';

export function getSortOrder(oldSortOrder: SortOrders) {
  switch (oldSortOrder) {
    case (SortOrders.DEFAULT):
      return SortOrders.DESC;
    case (SortOrders.DESC):
      return SortOrders.ASC;
    default:
      return null;
  }
}

export function sortPeopleBy(
  people: Person[],
  sortFilter: SortColumns,
  sortOrder: string,
): Person[] {
  const peopleResult = people;

  switch (sortFilter) {
    case (SortColumns.NAME): {
      peopleResult.sort((person1: Person, person2: Person) => {
        return person2[SortColumns.NAME]
          .localeCompare(person1[SortColumns.NAME]);
      });

      break;
    }

    case (SortColumns.SEX): {
      peopleResult.sort((person1: Person, person2: Person) => {
        return person2[SortColumns.SEX]
          .localeCompare(person1[SortColumns.SEX]);
      });

      break;
    }

    case (SortColumns.BORN): {
      peopleResult.sort((person1: Person, person2: Person) => {
        return person2[SortColumns.BORN] - (person1[SortColumns.BORN]);
      });

      break;
    }

    case (SortColumns.DIED): {
      peopleResult.sort((person1: Person, person2: Person) => {
        return person2[SortColumns.DIED] - (person1[SortColumns.DIED]);
      });

      break;
    }

    default:
      break;
  }

  if (sortOrder === SortOrders.DESC) {
    peopleResult.reverse();
  }

  return peopleResult;
}

import { Person } from '../types';
import { SortColumns } from './SortColumns';

export function sortPeopleBy(
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

import { SortFilter } from '../types/SortFilter';
import { Person } from '../types';

export const peopleSort = (
  people: Person[],
  direction: number,
  sort: string,
) => {
  return people.sort(
    (
      { name: nameA, sex: sexA, born: bornA, died: diedA },
      { name: nameB, sex: sexB, born: bornB, died: diedB },
    ) => {
      switch (sort) {
        case SortFilter.Name:
          return direction * nameA.localeCompare(nameB);

        case SortFilter.Sex:
          return direction * sexA.localeCompare(sexB);

        case SortFilter.Born:
          return direction * (bornA - bornB);

        case SortFilter.Died:
          return direction * (diedA - diedB);

        default:
          return 0;
      }
    },
  );
};

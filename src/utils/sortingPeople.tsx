import { Person } from '../types';

export enum SortType {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
}

export const sortingPeople = (
  people: Person[],
  sortBy: string | null,
  order: string | null,
) => {
  if (sortBy) {
    const copyPeople = [...people];

    copyPeople.sort((a, b) => {
      switch (sortBy) {
        case SortType.NAME:
        case SortType.SEX:
          return order === 'desc'
            ? b[sortBy].localeCompare(a[sortBy])
            : a[sortBy].localeCompare(b[sortBy]);

        case SortType.BORN:
        case SortType.DIED:
          return order === 'desc'
            ? +b[sortBy] - +a[sortBy]
            : +a[sortBy] - +b[sortBy];

        default:
          return 0;
      }
    });

    return copyPeople;
  }

  return people;
};

import { PersonFull, SortByOptions } from '../types';

type Result = (firstPerson: PersonFull, secondPerson: PersonFull) => number;

export const usePeopleTableSortCallback = (column: SortByOptions): Result => {
  switch (column) {
    case SortByOptions.Born:
    case SortByOptions.Died:
      return (firstPerson, secondPerson) => (
        firstPerson[column] - secondPerson[column]
      );

    case SortByOptions.Name:
    case SortByOptions.Sex:
      return (firstPerson, secondPerson) => (
        firstPerson[column].localeCompare(secondPerson[column])
      );

    default:
      return () => 0;
  }
};

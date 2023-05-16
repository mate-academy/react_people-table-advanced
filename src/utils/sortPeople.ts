import { Person } from '../types';

export enum SortType {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export function sortPeople(
  people: Person[],
  sortBy: string | null,
  order: string | null,
): Person[] {
  const copyArr = [...people];

  function compareNumberType(prop1: number, prop2: number): number {
    if (order === 'desc') {
      return prop2 - prop1;
    }

    return prop1 - prop2;
  }

  copyArr.sort((personA, personB): number => {
    switch (sortBy) {
      case SortType.Name:
      case SortType.Sex:

        if (order === 'desc') {
          return personB[sortBy].localeCompare(personA[sortBy]);
        }

        return personA[sortBy].localeCompare(personB[sortBy]);

      case SortType.Born:
      case SortType.Died:

        return compareNumberType(personA[sortBy], personB[sortBy]);

      default:
        break;
    }

    return 0;
  });

  return copyArr;
}

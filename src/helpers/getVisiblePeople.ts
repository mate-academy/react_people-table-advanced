import { SexFilterType } from '../enums/SexFilterType';
import { SortType } from '../enums/SortType';
import { Person } from '../types';

const isQueryInValues = (query: string, values: string[]): boolean => {
  return values.some(
    (value) => value.toLowerCase().includes(query),
  );
};

const getCentury = (year: number): number => {
  let century = Math.ceil(year / 100);

  if (year % 100 === 0) {
    century -= 1;
  }

  return century;
};

export const getVisiblePeople = (
  people: Person[],
  sexFilter: SexFilterType,
  query: string,
  centuries: number[],
  sortType: SortType,
  order: string | null,
): Person[] => {
  let visiblePeople = [...people];

  if (sexFilter !== SexFilterType.All) {
    visiblePeople = visiblePeople.filter(({ sex }) => sex === sexFilter);
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(
      ({ born }) => centuries.includes(getCentury(born)),
    );
  }

  if (query) {
    const normalizedQuery = query
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .join(' ');

    return people.filter(({ name, fatherName, motherName }) => {
      return isQueryInValues(normalizedQuery, [
        name,
        motherName ?? '',
        fatherName ?? '',
      ]);
    });
  }

  if (sortType !== SortType.None) {
    visiblePeople = visiblePeople.sort(
      (currentPerson: Person, nextPerson: Person) => {
        switch (sortType) {
          case SortType.Sex:
          case SortType.Name:
            return currentPerson[sortType].localeCompare(nextPerson[sortType]);

          case SortType.Born:
          case SortType.Died:
            return currentPerson[sortType] - nextPerson[sortType];

          default:
            return 0;
        }
      },
    );
  }

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};

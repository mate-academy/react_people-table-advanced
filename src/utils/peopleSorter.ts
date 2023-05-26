import { Person } from '../types';
import { SortType } from '../types/SortType';

const compareStrings = (firstString: string, secondString: string) => {
  return firstString.localeCompare(secondString);
};

const compareNumbers = (firstNumber: number, secondNumber: number) => {
  return firstNumber - secondNumber;
};

export const getSortedPeople = (
  people: Person[],
  sortType: SortType | null,
  isReversed: boolean,
) => {
  let sortedPeople = [...people];

  sortedPeople.sort((currentPerson, nextPerson) => {
    switch (sortType) {
      case SortType.Name:
      case SortType.Sex:
        return compareStrings(currentPerson[sortType], nextPerson[sortType]);

      case SortType.Born:
      case SortType.Died:
        return compareNumbers(currentPerson[sortType], nextPerson[sortType]);

      default: return 0;
    }
  });

  if (isReversed) {
    sortedPeople = sortedPeople.reverse();
  }

  return sortedPeople;
};

export const getSortingInfo = (
  selectedSortType: string | null,
  sortType: SortType,
  order: string | null,
) => {
  const isSortedByCurrentType = selectedSortType === sortType;
  const isDescOrdered = order === 'desc';

  const isFirstClick = !isSortedByCurrentType && !isDescOrdered;
  const isSecondClick = isSortedByCurrentType && !isDescOrdered;
  const isThirdClick = isSortedByCurrentType && isDescOrdered;

  if (isFirstClick) {
    return { sortingParams: { sort: sortType, order: null }, clicks: 1 };
  }

  if (isSecondClick) {
    return { sortingParams: { sort: sortType, order: 'desc' }, clicks: 2 };
  }

  if (isThirdClick) {
    return { sortingParams: { sort: null, order: null }, clicks: 3 };
  }

  return { sortingParams: { sort: null, order: null }, clicks: 1 };
};

import { SortType } from '../enums/SortType';
import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  sortType: SortType,
  order: string | null,
): Person[] => {
  window.console.log(order);
  let sortedPeople = [...people];

  if (sortType !== SortType.None) {
    sortedPeople = people.sort((currentPerson: Person, nextPerson: Person) => {
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
    });
  }

  if (order) {
    sortedPeople.reverse();
  }

  return sortedPeople;
};

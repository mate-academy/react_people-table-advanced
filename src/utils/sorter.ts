import { Person } from '../types';

export const sortFunction = (
  filteredPeople: Person[],
  searchPar: URLSearchParams,
): Person[] => {
  const switchSort = searchPar.get('sort');
  const direction = searchPar.get('order') ? -1 : 1;

  if (!switchSort) {
    return filteredPeople;
  }

  const sorted = [...filteredPeople].sort((elem1, elem2) => {
    switch (switchSort) {
      case 'name':
      case 'sex':
        return elem1[switchSort].localeCompare(elem2[switchSort]) * direction;

      case 'born':
      case 'died':
        return (elem1.born - elem2.born) * direction;

      default:
        return 0;
    }
  });

  return sorted;
};

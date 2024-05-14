import { Person } from '../types';

export const sortFunction = (
  filteredPeople: Person[],
  searchPar: URLSearchParams,
): Person[] => {
  const switchSort = searchPar.get('sort');

  switch (switchSort) {
    case 'name':
      if (
        searchPar.has('sort') &&
        searchPar.get('sort') !== switchSort &&
        !searchPar.has('order')
      ) {
        return filteredPeople;
      }

      if (
        searchPar.has('sort') &&
        searchPar.get('sort') !== switchSort &&
        searchPar.has('order')
      ) {
        return filteredPeople.sort((elem1, elem2) => {
          return elem2.name.localeCompare(elem1.name);
        });
      }

      if (searchPar.has('sort') && searchPar.get('sort') === switchSort) {
        return filteredPeople.sort((elem1, elem2) => {
          return elem1.name.localeCompare(elem2.name);
        });
      }

      return filteredPeople;

    case 'sex':
      if (
        searchPar.has('sort') &&
        searchPar.get('sort') !== switchSort &&
        !searchPar.has('order')
      ) {
        return filteredPeople;
      }

      if (
        searchPar.has('sort') &&
        searchPar.get('sort') === switchSort &&
        searchPar.has('order')
      ) {
        return filteredPeople.sort((elem1, elem2) => {
          return elem2.sex.localeCompare(elem1.sex);
        });
      }

      if (searchPar.has('sort') && searchPar.get('sort') === switchSort) {
        return filteredPeople.sort((elem1, elem2) => {
          return elem1.sex.localeCompare(elem2.sex);
        });
      }

      return filteredPeople;
    case 'born':
      if (
        searchPar.has('sort') &&
        searchPar.get('sort') !== switchSort &&
        !searchPar.has('order')
      ) {
        return filteredPeople;
      }

      if (
        searchPar.has('sort') &&
        searchPar.get('sort') === switchSort &&
        searchPar.has('order')
      ) {
        return filteredPeople.sort((elem1, elem2) => {
          return elem2.born - elem1.born;
        });
      }

      if (searchPar.has('sort') && searchPar.get('sort') === switchSort) {
        return filteredPeople.sort((elem1, elem2) => {
          return +elem1.born - +elem2.born;
        });
      }

      return filteredPeople;
    case 'died':
      if (
        searchPar.has('sort') &&
        searchPar.get('sort') !== switchSort &&
        !searchPar.has('order')
      ) {
        return filteredPeople;
      }

      if (
        searchPar.has('sort') &&
        searchPar.get('sort') !== switchSort &&
        searchPar.has('order')
      ) {
        return filteredPeople.sort((elem1, elem2) => {
          return elem2.died - elem1.died;
        });
      }

      if (searchPar.has('sort') && searchPar.get('sort') === switchSort) {
        return filteredPeople.sort((elem1, elem2) => {
          return +elem1.died - +elem2.died;
        });
      }

      return filteredPeople;
    default:
      return filteredPeople;
  }
};

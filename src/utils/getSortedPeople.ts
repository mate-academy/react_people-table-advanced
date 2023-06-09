import { Person } from '../types/Person';
import { SortCriteria } from '../types/SortCriteria';

export const getSortedPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  let sortedPeople = [...people];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  if (sort) {
    switch (sort) {
      case SortCriteria.Name:
      case SortCriteria.Sex:
        sortedPeople.sort((personA, personB) => (
          personA[sort].localeCompare(personB[sort])
        ));
        break;

      case SortCriteria.Born:
      case SortCriteria.Died:
        sortedPeople.sort((personA, personB) => (
          personA[sort] - personB[sort]
        ));
        break;

      default:
        sortedPeople = people;
    }

    if (order) {
      sortedPeople = sortedPeople.reverse();
    }
  }

  return sortedPeople;
};

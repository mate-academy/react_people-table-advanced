import Person from '../types/Person';
import Sort, { Order, SortField } from '../types/Sort';

export const sortPeople = (
  people: Person[],
  sortParam: Sort | null,
  orderParam: Order | null,
) => {
  const order = orderParam === 'desc' ? -1 : 1;

  switch (sortParam) {
    case SortField.FullName:
    case SortField.Gender:
      return people.toSorted((a, b) => {
        return a[sortParam].localeCompare(b[sortParam]) * order;
      });
    case SortField.BornYear:
    case SortField.DiedYear:
      return people.toSorted((a, b) => {
        return (a[sortParam] - b[sortParam]) * order;
      });
    default:
      return people;
  }
};

export default sortPeople;

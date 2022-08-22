import { Person } from './types';
import { SortBy } from './types/SortBy';

export const filterPeople = (people: Person[], query: string) => {
  const lowerQuery = query.toLowerCase();

  return people.filter(({ name, motherName, fatherName }) => (
    (name + motherName + fatherName).toLowerCase().includes(lowerQuery)
  ));
};

export const sortPeople = (
  people: Person[],
  sortOrder: string,
  sortBy: string,
) => {
  const sortedPeople = [...people];
  const numOrder = sortOrder === 'asc' ? 1 : -1;

  switch (sortBy) {
    case SortBy.Name:
    case SortBy.Sex:
      sortedPeople.sort((firstPerson, secondPerson) => (
        firstPerson[sortBy].localeCompare(secondPerson[sortBy]) * numOrder
      ));
      break;

    case SortBy.Born:
    case SortBy.Died:
      sortedPeople.sort((firstPerson, secondPerson) => (
        (firstPerson[sortBy] - secondPerson[sortBy]) * numOrder
      ));
      break;

    default:
      break;
  }

  return sortedPeople;
};

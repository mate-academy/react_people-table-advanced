import { Person } from '../types/Person';

export const sortPeople = (
  people: Person[],
  sortBy: string | number | null,
  order: string | null,
) => {
  let sortedPeople = [...people];

  if (sortBy === 'name' || sortBy === 'sex') {
    sortedPeople = sortedPeople.sort((person1: Person, person2: Person) => {
      return order === 'desc'
        ? person2[sortBy].localeCompare(person1[sortBy])
        : person1[sortBy].localeCompare(person2[sortBy]);
    });
  }

  if (sortBy === 'born' || sortBy === 'died') {
    sortedPeople = sortedPeople.sort((person1: Person, person2: Person) => {
      return order === 'desc'
        ? person2[sortBy] - person1[sortBy]
        : person1[sortBy] - person2[sortBy];
    });
  }

  return sortedPeople;
};

import { Person } from '../types/Person';

export const sortPeople = (
  people: Person[],
  sortType: string | null,
  order: string | null,
) => {
  const sortedPeople = [...people];

  switch (sortType) {
    case 'name':
    case 'sex':
      sortedPeople.sort((firstPerson, secondPerson) => {
        return order
          ? firstPerson[sortType]
            .localeCompare(secondPerson[sortType])
          : secondPerson[sortType]
            .localeCompare(firstPerson[sortType]);
      });

      return sortedPeople;

    case 'born':
    case 'died':
      sortedPeople
        .sort((firstPerson, secondPerson) => {
          return order
            ? secondPerson[sortType] - firstPerson[sortType]
            : firstPerson[sortType] - secondPerson[sortType];
        });

      return sortedPeople;

    default:
      return sortedPeople;
  }
};

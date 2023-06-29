/* eslint-disable max-len */
import { Person } from '../types';

export const sortPeople = (
  people: Person[],
  order: string | null,
  sort: string | null,
) => {
  let sortedPeople = [...people];

  switch (sort) {
    case ('name'):
    case ('sex'):
      if (order) {
        sortedPeople = sortedPeople.sort((prevPerson, currentPerson) => currentPerson[sort].localeCompare(prevPerson[sort]));
      } else if (!order) {
        sortedPeople = sortedPeople.sort((prevPerson, currentPerson) => prevPerson[sort].localeCompare(currentPerson[sort]));
      }

      return sortedPeople;
    case ('born'):
    case ('died'):
      if (order) {
        sortedPeople = sortedPeople.sort((prevPerson, currentPerson) => currentPerson[sort] - prevPerson[sort]);
      } else if (!order) {
        sortedPeople = sortedPeople.sort((prevPerson, currentPerson) => prevPerson[sort] - currentPerson[sort]);
      }

      return sortedPeople;

    default:
      return sortedPeople;
  }
};

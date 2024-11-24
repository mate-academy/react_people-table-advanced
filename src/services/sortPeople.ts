import { Person } from '../types';

export const sortingPeople = (
  sortType: string | null,
  orderType: string | null,
  filteredPeople: Person[] | [],
) => {
  let pervPeople = filteredPeople;

  if (!sortType) {
    pervPeople = filteredPeople;
  }

  switch (sortType) {
    case 'name':
      if (!orderType) {
        pervPeople = [...filteredPeople].sort((personA, personB) =>
          personA.name.localeCompare(personB.name),
        );
      } else {
        pervPeople = [...filteredPeople].sort((personA, personB) =>
          personB.name.localeCompare(personA.name),
        );
      }

      break;

    case 'sex':
      if (!orderType) {
        pervPeople = [...filteredPeople].sort((personA, personB) =>
          personA.sex.localeCompare(personB.sex),
        );
      } else {
        pervPeople = [...filteredPeople]
          .sort((personA, personB) => personA.sex.localeCompare(personB.sex))
          .reverse();
      }

      break;
    case 'born':
      if (!orderType) {
        pervPeople = [...filteredPeople].sort(
          (personA, personB) => personA.born - personB.born,
        );
      } else {
        pervPeople = [...filteredPeople].sort(
          (personA, personB) => personB.born - personA.born,
        );
      }

      break;
    case 'died':
      if (!orderType) {
        pervPeople = [...filteredPeople].sort(
          (personA, personB) => personA.died - personB.died,
        );
      } else {
        pervPeople = [...filteredPeople].sort(
          (personA, personB) => personB.died - personA.died,
        );
      }

      break;
  }

  return pervPeople;
};

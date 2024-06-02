import { Person } from '../types';

type Filters = {
  query: string;
  sex: string;
  centuries: string[];
  sortType: string;
  order: string;
};

export function getFilteredPeople(
  peopleFromServer: Person[],
  { query, sex, centuries, sortType, order }: Filters,
) {
  let filteredPeople = [...peopleFromServer];

  if (query) {
    const normQuery = query.trim().toLowerCase();

    filteredPeople = filteredPeople.filter(
      person =>
        person.name.toLowerCase().includes(normQuery) ||
        person.fatherName?.toLowerCase().includes(normQuery) ||
        person.motherName?.toLowerCase().includes(normQuery),
    );
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      return centuries.some(
        century => +century === Math.ceil(person.born / 100),
      );
    });
  }

  if (sortType) {
    filteredPeople = filteredPeople.sort((a, b) => {
      switch (sortType) {
        case 'born':
        case 'died':
          return a[sortType] - b[sortType];

        case 'name':
        case 'sex':
          return a[sortType].localeCompare(b[sortType]);

        default:
          return 0;
      }
    });
  }

  if (order) {
    filteredPeople = filteredPeople.reverse();
  }

  return filteredPeople;
}

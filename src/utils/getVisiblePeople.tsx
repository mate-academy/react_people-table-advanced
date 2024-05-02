import { PersonType } from '../types/PersonType';

export const getVisiblePeople = (
  people: PersonType[],
  filters: {
    query: string | null;
    centuries: string[];
    sex: string | null;
    sort: string | null;
    order: string | null;
  },
) => {
  let filteredPeople: PersonType[] = [...people];

  if (filters.query) {
    const query = filters.query;

    filteredPeople = filteredPeople.filter(person =>
      person.name.toLowerCase().includes(query),
    );
  }

  if (filters.sex) {
    filteredPeople = filteredPeople.filter(
      person => person.sex === filters.sex,
    );
  }

  if (filters.centuries.length !== 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return filters.centuries.includes(century.toString());
    });
  }

  if (filters.sort) {
    filteredPeople = filteredPeople.sort((person1, person2) => {
      const valueA = person1[filters.sort as keyof PersonType];
      const valueB = person2[filters.sort as keyof PersonType];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueA - valueB;
      }

      return 0;
    });
  }

  if (filters.order) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};

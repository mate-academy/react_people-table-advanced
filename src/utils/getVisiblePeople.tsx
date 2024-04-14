import { PersonType } from '../types/PersonType';

export const getVisiblePeople = (
  people: PersonType[],
  query: string | null,
  centuries: string[],
  sex: string | null,
  sort: string | null,
  order: string | null,
) => {
  let filteredPeople: PersonType[] = [...people];

  if (query) {
    filteredPeople = filteredPeople.filter(person =>
      person.name.toLowerCase().includes(query),
    );
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length !== 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(century.toString());
    });
  }

  if (sort) {
    filteredPeople = filteredPeople.sort((person1, person2) => {
      const valueA = person1[sort as keyof PersonType];
      const valueB = person2[sort as keyof PersonType];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueA - valueB;
      }

      return 0;
    });
  }

  if (order) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};

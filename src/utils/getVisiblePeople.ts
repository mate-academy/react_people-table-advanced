import { Person } from '../types';

export const getVisiblePeople = (
  people: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[],
) => {
  let visiblePeople = [...people];

  if (query) {
    visiblePeople = visiblePeople.filter(person => person.name.includes(query));
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person => {
      return centuries.includes(
        Math.ceil(person.born / 100).toString(),
      );
    });
  }

  return visiblePeople;
};

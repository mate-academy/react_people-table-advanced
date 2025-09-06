import { Order, Person, SortType } from '../types';

export function filteringPeople(
  currentPeople: Person[],
  sex: string | null,
  query: string,
  centuries: string[],
  order: Order | null,
  sort: SortType | null,
) {
  let newPeople = [...currentPeople];

  if (sex) {
    newPeople = newPeople.filter(person => person.sex === sex);
  }

  if (query) {
    newPeople = newPeople.filter(person => {
      if (
        person.name.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query)
      ) {
        return true;
      }

      return false;
    });
  }

  if (centuries.length !== 0) {
    newPeople = newPeople.filter(person => {
      const bornCenter = (Math.floor(person.born / 100) + 1).toString();
      const diedCenter = (Math.floor(person.died / 100) + 1).toString();

      return centuries.includes(bornCenter) || centuries.includes(diedCenter);
    });
  }

  switch (sort) {
    case 'name':
    case 'sex':
      return newPeople.sort((person1, person2) =>
        order === 'asc'
          ? person1[sort].localeCompare(person2[sort])
          : person2[sort].localeCompare(person1[sort]),
      );
    case 'born':
    case 'died':
      return newPeople.sort((person1, person2) =>
        order === 'asc'
          ? person1[sort] - person2[sort]
          : person2[sort] - person1[sort],
      );
  }

  return newPeople;
}

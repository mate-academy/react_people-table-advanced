import { Person } from '../types';
import { SortOptions } from '../types/SortOptions';
import { SortOrders } from '../types/SortOrders';

export const getFilteredPeople = (
  people: Person[],
  filterBySex: string | null,
  query: string,
  centuries: string[],
  searchOption: SortOptions,
  searchOrder?: SortOrders,
) => {
  let newPeople = [...people];
  const normalizedQuery = query.trim().toLowerCase();

  if (centuries.length > 0) {
    const normalizedCenturies = centuries.map(century => +century);

    newPeople = newPeople.filter(person => {
      const bornCentury = Math.ceil(person.born / 100);

      return normalizedCenturies.includes(bornCentury);
    });
  }

  if (normalizedQuery !== '') {
    newPeople = newPeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (filterBySex) {
    newPeople = newPeople.filter(person => person.sex === filterBySex);
  }

  const direction = searchOrder === SortOrders.Descedent ? -1 : 1;

  newPeople.sort((a: Person, b: Person) => {
    const person1 = a[searchOption];
    const person2 = b[searchOption];

    if (typeof person1 === 'string' && typeof person2 === 'string') {
      return direction * person1.localeCompare(person2);
    }

    if (typeof person1 === 'number' && typeof person2 === 'number') {
      return direction * (person1 - person2);
    }

    return 0;
  });

  return newPeople;
};

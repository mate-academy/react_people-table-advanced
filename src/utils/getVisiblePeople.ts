import { Person } from '../types';

export const getVisiblePeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[] | null,
  sortParam: string,
  orderParam: string,
) => {
  let peopleCopy = [...people];

  if (sex) {
    peopleCopy = peopleCopy.filter(person => person.sex === sex);
  }

  if (query) {
    peopleCopy = peopleCopy.filter(person => {
      return (
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query)
      );
    });
  }

  if (centuries?.length) {
    peopleCopy = peopleCopy.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  if (sortParam) {
    peopleCopy.sort((a: Person, b: Person) => {
      const currentValue = a[sortParam as keyof Person];
      const nextValue = b[sortParam as keyof Person];

      if (typeof currentValue === 'string' && typeof nextValue === 'string') {
        return currentValue.localeCompare(nextValue);
      }

      if (typeof currentValue === 'number' && typeof nextValue === 'number') {
        return currentValue - nextValue;
      }

      return 0;
    });
  }

  if (orderParam) {
    peopleCopy.reverse();
  }

  return peopleCopy;
};

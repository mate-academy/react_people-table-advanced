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
  const lowerCaseQuery = query?.toLowerCase();

  const isIncluded = (value: string | null) => {
    if (value && lowerCaseQuery) {
      return value.toLowerCase().includes((lowerCaseQuery));
    }
    return false;
  };

  if (sex) {
    peopleCopy = peopleCopy.filter(person => person.sex === sex);
  }

  if (lowerCaseQuery) {
    peopleCopy = peopleCopy.filter(person => {
      return (
        isIncluded(person.name) ||
        isIncluded(person.motherName) ||
        isIncluded(person.fatherName)
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

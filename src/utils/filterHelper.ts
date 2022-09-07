import { Person } from '../types/Person';

function centuryFromYear(year: number): string {
  return `${Math.floor((year - 1) / 100) + 1}`;
}

export const filtredPeople = (
  peopleToFilter: Person[],
  query: string | null,
  sexFilter: string | null,
  centuries: string[],
  order: string | null,
  sort: string | null,
): Person[] => {
  let copy = [...peopleToFilter];

  if (query) {
    copy = copy.filter(person => (
      person.name.toLowerCase().includes(query.toLowerCase().trim())
    ));
  }

  if (sexFilter === 'm') {
    copy = copy.filter(person => (
      person.sex === 'm'
    ));
  }

  if (sexFilter === 'f') {
    copy = copy.filter(person => (
      person.sex === 'f'
    ));
  }

  if (centuries.length) {
    copy = (copy
      .filter(person => (
        centuries.includes(centuryFromYear(person.born)))));
  }

  if (sort) {
    copy.sort((a, b) => {
      const aElement = (order === 'desc')
        ? b[sort as keyof Person]
        : a[sort as keyof Person];
      const bElement = (order === 'desc')
        ? a[sort as keyof Person]
        : b[sort as keyof Person];

      if (typeof aElement === 'string' && typeof bElement === 'string') {
        return aElement.localeCompare(bElement);
      }

      if (typeof aElement === 'number' && typeof bElement === 'number') {
        return aElement - bElement;
      }

      return 0;
    });
  }

  return copy;
};

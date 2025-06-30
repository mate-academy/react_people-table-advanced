import { Person } from '../types';

export const findSlug = (people: Person[], name: string | null) => {
  const person = people.find(man => man.name === name) || null;

  return person ? person.slug : '';
};

export const getTheClassName = (person: Person) =>
  person && person.sex === 'f' ? 'has-text-danger' : '';

export const getTheParentName = (name: string | null) =>
  name && name.length > 0 ? name : '-';

export const peopleWithParents = (people: Person[]): Person[] => {
  return people.map(person => {
    const mother = people.find(man => man.name === person.motherName) || null;
    const father = people.find(man => man.name === person.fatherName) || null;

    return {
      ...person,
      ...(mother && { mother }),
      ...(father && { father }),
    };
  });
};

export function debounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timerId: number | undefined;

  return (...args: Parameters<T>) => {
    if (timerId) {
      window.clearTimeout(timerId);
    }

    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

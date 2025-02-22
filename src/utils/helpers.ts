import cn from 'classnames';
import { Person, SortBy } from '../types';

export const getNavbarItemClassName = (isActive: boolean): string => {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const getPeopleWithParents = (people: Person[]): Person[] => {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(mother => mother.name === person.motherName),
      father: people.find(father => father.name === person.fatherName),
    };
  });
};

export const getSortedPeople = (people: Person[], sortBy: SortBy) => {
  return [...people].sort((person1, person2) => {
    if (sortBy === SortBy.Name || sortBy === SortBy.Sex) {
      return person1[sortBy].localeCompare(person2[sortBy]);
    }

    if (sortBy === SortBy.Born || sortBy === SortBy.Died) {
      return person1[sortBy] - person2[sortBy];
    }

    return 0;
  });
};

export const toggleCentury = (century: string, centuries: string[]) => {
  return centuries.includes(century)
    ? centuries.filter(period => period !== century)
    : [...centuries, century];
};

export const filterPersonByQuery = (person: Person, query: string) => {
  const lowerQuery = query.toLowerCase();

  return (
    person.name.toLowerCase().includes(lowerQuery) ||
    person.motherName?.toLowerCase().includes(lowerQuery) ||
    person.fatherName?.toLowerCase().includes(lowerQuery)
  );
};

export const filterByCenturies = (centuries: string[], born: number) => {
  return centuries.includes(`${Math.ceil(born / 100)}`);
};

export const TABLE_THS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
export const EMPTY_VALUE = '-';

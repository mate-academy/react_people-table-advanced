import cn from 'classnames';
import { Person, SortBy } from '../types';

export const EMPTY = '-';
export const TABLE_HEADERS = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

export const getNavbarClassName = (isActive: boolean): string => {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const getPeopleWithParents = (people: Person[]): Person[] => {
  const peopleMap = new Map(people.map(person => [person.name, person]));

  return people.map(person => {
    const mother = person.motherName
      ? peopleMap.get(person.motherName)
      : undefined;
    const father = person.fatherName
      ? peopleMap.get(person.fatherName)
      : undefined;

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const getSortPeople = (people: Person[], sortBy: SortBy): Person[] => {
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

export const toggleCentury = (
  century: string,
  selectedCenturies: string[],
): string[] => {
  return selectedCenturies.includes(century)
    ? selectedCenturies.filter(date => date !== century)
    : [...selectedCenturies, century];
};

export const filterPersonByQuery = (person: Person, query: string) => {
  const lowerCaseQuery = query.toLowerCase();

  return (
    person.name.toLowerCase().includes(lowerCaseQuery) ||
    person.motherName?.toLowerCase().includes(lowerCaseQuery) ||
    person.fatherName?.toLowerCase().includes(lowerCaseQuery)
  );
};

export const filterPeopleByCenturies = (
  centuries: string[],
  born: number,
): boolean => {
  const personCentury = `${Math.ceil(born / 100)}`;

  return centuries.includes(personCentury);
};

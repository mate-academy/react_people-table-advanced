import classNames from 'classnames';
import { Person } from '../types';
import { SortBy } from '../types/SortBy';

export const NO_INFO = '-';

export const getNavbarCLass = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
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

export const filterPersonByCenturies = (
  centuries: string[],
  born: number,
): boolean => {
  const personCentury = `${Math.ceil(born / 100)}`;

  return centuries.includes(personCentury);
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
  return [...people].sort((per1, per2) => {
    if (sortBy === SortBy.Name || sortBy === SortBy.Sex) {
      return per1[sortBy].localeCompare(per2[sortBy]);
    }

    if (sortBy === SortBy.Born || sortBy === SortBy.Died) {
      return per1[sortBy] - per2[sortBy];
    }

    return 0;
  });
};

import { Person } from '../types';
import { SortField } from '../types/SortField';
import { SEX_FEMALE, SEX_MALE } from './constants';

interface FilterParams {
  sex: string | null;
  query: string;
  centuries: string[];
  sort: string | null;
  order: string | null;
}

const CENTURY = 100;

const checkQueryMatch = (name: string | null, query: string) => {
  return name?.toLowerCase().includes(query);
};

export const getPreparedPeople = (peopleList: Person[]) => {
  return peopleList.map(person => {
    return {
      ...person,
      mother: peopleList.find(({ name }) => name === person.motherName),
      father: peopleList.find(({ name }) => name === person.fatherName),
    };
  });
};

export const getFilteredPeople = (peopleList: Person[], {
  sex, query, centuries, sort, order,
}: FilterParams) => {
  let filteredPeople = peopleList;

  if (sex === SEX_MALE) {
    filteredPeople = filteredPeople.filter(person => person.sex === SEX_MALE);
  }

  if (sex === SEX_FEMALE) {
    filteredPeople = filteredPeople.filter(person => person.sex === SEX_FEMALE);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      const normalizedQuery = query.trim().toLowerCase();

      if (normalizedQuery === '') {
        return false;
      }

      const name = checkQueryMatch(person.name, normalizedQuery);
      const motherName = checkQueryMatch(person.motherName, normalizedQuery);
      const fatherName = checkQueryMatch(person.fatherName, normalizedQuery);

      return name || motherName || fatherName;
    });
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      const century = `${Math.ceil(person.born / CENTURY)}`;

      return centuries.includes(century);
    });
  }

  filteredPeople = [...filteredPeople].sort((personA, personB) => {
    switch (sort) {
      case SortField.Name:
      case SortField.Sex:
        return personA[sort].localeCompare(personB[sort]);

      case SortField.Born:
      case SortField.Died:
        return personA[sort] - personB[sort];

      default:
        return 0;
    }
  });

  if (order) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};

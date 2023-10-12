import { Person } from '../types';
import { PersonSex } from '../types/PersonSex';
import { SortField } from '../types/SortField';
import { CENTURY } from './constants';

interface FilterParams {
  sex: string | null;
  query: string;
  centuries: string[];
  sort: string | null;
  order: string | null;
}

const isQueryMatch = (name: string | null, query: string) => {
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
  sex,
  query,
  centuries,
  sort,
  order,
}: FilterParams) => {
  let filteredPeople = peopleList;

  filteredPeople = filteredPeople.filter(person => {
    switch (sex) {
      case PersonSex.SEX_MALE:
        return person.sex === PersonSex.SEX_MALE;

      case PersonSex.SEX_FEMALE:
        return person.sex === PersonSex.SEX_FEMALE;

      default:
        return person;
    }
  });

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      const normalizedQuery = query.trim().toLowerCase();

      if (!normalizedQuery) {
        return false;
      }

      const name = isQueryMatch(person.name, normalizedQuery);
      const motherName = isQueryMatch(person.motherName, normalizedQuery);
      const fatherName = isQueryMatch(person.fatherName, normalizedQuery);

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

import { Person } from '../types';
import { FilterTypes } from '../enums/FilterTypes';

interface FunctionParams {
  peopleList: Person[];
  activeFilter: string;
  searchQuery: string;
  centuries: string[];
}

const filterListByGender = (gender: string, filter: string) => {
  switch (filter) {
    case FilterTypes.Female:
      return gender === FilterTypes.Female;
    case FilterTypes.Male:
      return gender === FilterTypes.Male;
    default:
      return true;
  }
};

const filterListByQuery = (person: Person, query: string) => {
  const fixedQuery = query.toLowerCase().trim();

  return (
    person.name.toLowerCase().includes(fixedQuery) ||
    person.fatherName?.toLowerCase().includes(fixedQuery) ||
    person.motherName?.toLowerCase().includes(fixedQuery)
  );
};

const filterListByCenturies = (
  person: Person,
  centuries: string[],
): boolean => {
  const centuryOfBirth = Math.ceil(person.born / 100);

  return centuries.includes(centuryOfBirth.toString());
};

export const getFilteredList = ({
  peopleList,
  activeFilter,
  searchQuery,
  centuries,
}: FunctionParams): Person[] => {
  return (
    peopleList.filter(person => {
      const genderMatch = filterListByGender(person.sex, activeFilter);

      const queryMatch = searchQuery
        ? filterListByQuery(person, searchQuery)
        : true;

      const centuriesMatch =
        centuries.length > 0 ? filterListByCenturies(person, centuries) : true;

      return genderMatch && queryMatch && centuriesMatch;
    }) || []
  );
};

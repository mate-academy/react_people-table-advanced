import { Person } from '../types';

export const getFilteredTodos = (
  people: Person[],
  query: string,
  paramSex: string,
  centuries: string[],
  sortParam: string,
  isReversed: boolean,
): Person[] => {
  let filteredPeople = [...people];

  if (paramSex) {
    filteredPeople = filteredPeople.filter(person => (
      person.sex === paramSex
    ));
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const isCentury = centuries.some(century => (
        century === Math.ceil(person.born / 100).toString()
      ));

      return isCentury;
    });
  }

  if (query) {
    const lowerCaseQuery = query.toLocaleLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      const lowerName = person.name.toLowerCase();
      const lowerMotherName = person.motherName?.toLowerCase();
      const lowerFatherName = person.fatherName?.toLowerCase();

      return lowerName.includes(lowerCaseQuery)
        || lowerMotherName?.includes(lowerCaseQuery)
        || lowerFatherName?.includes(lowerCaseQuery);
    });
  }

  if (sortParam) {
    filteredPeople.sort((personA, personB) => {
      switch (sortParam) {
        case 'name':
        case 'sex':
          return personA[sortParam].localeCompare(personB[sortParam]);
        case 'born':
        case 'died':
          return personA[sortParam] - personB[sortParam];
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};

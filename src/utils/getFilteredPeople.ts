import { Person } from '../types';
import { SearchingParams } from '../types/SearchingParams';

const includesQuery = (person: Person, query: string) => {
  const { name, motherName, fatherName } = person;
  const normalisedQuery = query.toLowerCase();

  return name.toLowerCase().includes(normalisedQuery)
    || motherName?.toLowerCase().includes(normalisedQuery)
    || fatherName?.toLowerCase().includes(normalisedQuery);
};

export const getFilteredPeople = (
  searchParams: URLSearchParams, people: Person[],
) => {
  const query = searchParams.get(SearchingParams.Query) || '';
  const sex = searchParams.get(SearchingParams.Sex) || '';
  const centuries = searchParams.getAll(SearchingParams.Centuries) || [];

  let filteredPeople = [...people];

  if (query) {
    filteredPeople = people.filter(person => {
      return includesQuery(person, query);
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => {
      return person.sex === sex;
    });
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      return centuries.includes(String(Math.ceil(person.born / 100)));
    });
  }

  return filteredPeople;
};

import { URLSearchParams } from 'url';
import { Person } from '../types';

type Option = {
  sex: string | null;
  query: string | null;
  centuries: string[];
};

const belongsToCentury = (centuries: string[], man: Person) => {
  return centuries.map(Number).includes(Math.ceil(man.born / 100));
};

export function getFilteredPeople(people: Person[], params: URLSearchParams) {
  const filterOptions: Option = {
    sex: params.get('sex'),
    query: params.get('query')?.trim().toLowerCase() || null,
    centuries: params.getAll('centuries'),
  };

  const normalizedQuery = filterOptions.query?.trim().toLowerCase() || '';

  const filteredPeople = people.filter(person => {
    let shouldInclude = true;

    if (filterOptions.centuries.length) {
      shouldInclude = belongsToCentury(filterOptions.centuries, person);

      if (!shouldInclude) {
        return false;
      }
    }

    if (filterOptions.sex) {
      shouldInclude = shouldInclude && person.sex === filterOptions.sex;
    }

    if (normalizedQuery) {
      shouldInclude =
        shouldInclude &&
        person.name.toLocaleLowerCase().includes(normalizedQuery);
    }

    return shouldInclude;
  });

  return filteredPeople;
}

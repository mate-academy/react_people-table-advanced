import { URLSearchParams } from 'url';
import { Person } from '../types';

type Option = {
  sex: string | null;
  query: string | null;
  centuries: string[];
};

const sortByCenturies = (centuries: string[], man: Person) => {
  return centuries.map(Number).includes(Math.ceil(man.born / 100));
};

export function getFilterPeople(people: Person[], params: URLSearchParams) {
  const filterOptions: Option = {
    sex: params.get('sex'),
    query: params.get('query')?.trim().toLowerCase() || null,
    centuries: params.getAll('centuries'),
  };

  const normalizeQuery = filterOptions.query?.trim().toLowerCase() || '';

  const filteredPeople = people.filter(person => {
    if (filterOptions.sex) {
      return person.sex === filterOptions.sex;
    } else if (filterOptions.query) {
      return person.name.toLocaleLowerCase().includes(normalizeQuery);
    } else if (filterOptions.centuries.length) {
      return sortByCenturies(filterOptions.centuries, person);
    } else {
      return person;
    }
  });

  return filteredPeople;
}

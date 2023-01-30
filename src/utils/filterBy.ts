import { Person } from '../types';

interface FilterParams {
  people: Person[];
  query: string | null;
  sex: 'f' | 'm' | null;
  centuries: string[];
}

type FilterBy = (params: FilterParams) => Person[];

export const filterBy: FilterBy = ({ people, query, sex, centuries }) => {
  const cleanedQuery = query?.trim().toLowerCase();

  return [...people]
    .filter(person => (sex ? person.sex === sex : true))
    .filter(person => {
      return person.name.toLowerCase().includes(cleanedQuery || '');
    })
    .filter(person => {
      return centuries.length > 0
        ? centuries.includes(Math.ceil(person.born / 100).toString())
        : true;
    });
};

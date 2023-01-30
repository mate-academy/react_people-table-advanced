import { Person } from '../types';

interface FilterParams {
  people: Person[];
  query: string | null;
  sex: 'f' | 'm' | null;
}

type FilterBy = (params: FilterParams) => Person[];

export const filterBy: FilterBy = ({ people, query, sex }) => {
  const cleanedQuery = query?.trim().toLowerCase();

  return [...people]
    .filter(person => (sex ? person.sex === sex : true))
    .filter(person => {
      return person.name.toLowerCase().includes(cleanedQuery || '');
    });
};

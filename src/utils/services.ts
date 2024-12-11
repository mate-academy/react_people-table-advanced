import { Person } from '../types';

export const getCenturiesList = (people: Person[]): number[] => {
  return [
    ...new Set(people.map(person => Math.ceil(person.born / 100))),
  ].sort();
};

export const getCenturiesFromUrl = (params: URLSearchParams): number[] =>
  (params.get('centuries') || '').split('-').filter(Boolean).map(Number);

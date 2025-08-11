import { Person } from '../types';

export const getCenturiesArr = (people: Person[]): string[] => {
  return [...new Set(people.map(person => Math.ceil(person.born / 100)))]
    .sort()
    .map(String);
};

export const getCenturiesFromUrl = (params: URLSearchParams): string[] =>
  (params.get('centuries') || '').split(',').filter(Boolean);

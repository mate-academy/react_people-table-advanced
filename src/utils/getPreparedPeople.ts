import { URLSearchParams } from 'url';
import { Person } from '../types';

export const getPreparedPeople = (
  people: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  const preparedPeople = [...people];


  return preparedPeople
};

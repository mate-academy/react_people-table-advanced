import { Person } from '../types';
import { getData } from '../utils/httpClient';

export function getPeople() {
  return getData<Person>();
}

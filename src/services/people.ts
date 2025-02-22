import { getData } from '../utils/httpClient';

export function getPeople() {
  return getData().then(people => people);
}

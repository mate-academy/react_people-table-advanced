import { Person } from '../types/Person';
import { client } from '../utils/fetchClient';

export const getPeople = () => {
  return client.get<Person[]>('/people');
};

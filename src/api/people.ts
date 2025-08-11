import { Person } from '../types';
import { client } from '../utils/fetchClient';

export const getPeople = () => {
  client.get<Person[]>(`/people.json`);
};

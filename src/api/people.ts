import { API_BASE_URL } from './config';
import { client } from './client';
import { Person } from '../types';

export const getPeople = () => {
  return client.get<Person[]>(API_BASE_URL + '/people.json');
};

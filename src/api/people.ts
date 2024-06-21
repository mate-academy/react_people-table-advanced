import { client } from '../utils/fetchClient';
import { Person } from '../types';

export const getAllPeople = (url: string) => {
  return client.get<Person[]>(url);
};

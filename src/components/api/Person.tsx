import { Person } from '../../types';
import { client } from '../../utils/fetchClient';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPerson = () => {
  return client.get<Person[]>(API_URL);
};

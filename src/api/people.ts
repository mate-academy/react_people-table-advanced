import { request, API_URL } from './api';

export const getPeople = () => {
  return request(API_URL);
};

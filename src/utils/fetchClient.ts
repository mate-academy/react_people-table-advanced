/* eslint-disable @typescript-eslint/no-explicit-any */

import { Person } from '../types';
export const BASE_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(100)
    .then(() => fetch(BASE_URL))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

const client = {
  get: <T>() => request<T>(),
};

export const getPeople = () => {
  return client.get<Person[]>();
};

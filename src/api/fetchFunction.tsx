import { FetchResult } from '../types/FetchResult';

const API = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const fetchFunction = async (): Promise<FetchResult> => {
  const result: FetchResult = {
    data: null,
    responseError: {
      error: null,
      message: null,
    },
  };

  const res = await fetch(API);

  if (!res.ok) {
    result.responseError.error = 'Error';
    result.responseError.message = `${res.status} ${res.statusText}`;
  } else {
    result.data = await res.json();
  }

  return result;
};

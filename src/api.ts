export const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';

export const request = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const getPeople = async () => {
  const result = await request('/people.json');

  return result;
};

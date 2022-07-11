const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/';

export const getPeople = async () => {
  const response = await fetch(`${BASE_URL}/people.json`);

  return response.json();
};

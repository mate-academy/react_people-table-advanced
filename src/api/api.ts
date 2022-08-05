// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async (): Promise<Person[] | Response> => {
  try {
    const response = await fetch(BASE_URL);

    return await response.json();
  } catch {
    return Response.error();
  }
};

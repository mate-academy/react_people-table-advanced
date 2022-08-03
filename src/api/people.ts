const BASE_URL = 'https://mate-academy.github.io';
const PEOPLE_URL = `${BASE_URL}/react_people-table/api/people.json`;

export async function getPeople() {
  const response = await fetch(PEOPLE_URL);

  if (!response.ok) {
    const { status, statusText } = response;

    throw new Error(`${status} - ${statusText}`);
  }

  return response.json();
}

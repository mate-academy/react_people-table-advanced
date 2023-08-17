// eslint-disable-next-line max-len
const FETCH_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export async function fetchPeopleData() {
  try {
    const response = await fetch(FETCH_URL);
    const data = await response.json();

    return data;
  } catch {
    throw new Error('Failed to fetch people data.');
  }
}

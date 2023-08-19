// eslint-disable-next-line max-len
const FETCH_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function fetchPeopleData() {
  try {
    await wait(1000);

    const response = await fetch(FETCH_URL);
    const data = await response.json();

    return data;
  } catch {
    throw new Error('Failed to fetch people data.');
  }
}

const baseUrl
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

export function getPeople() {
  return fetch(baseUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }

      return res.json();
    });
}

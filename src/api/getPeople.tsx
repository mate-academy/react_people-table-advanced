const BASE_URL
= 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = (): Promise<Person[]> => {
  return fetch(`${BASE_URL}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status} - ${response.statusText}`));
      }

      return response.json();
    });
};

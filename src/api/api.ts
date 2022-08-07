const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getPeople = () => {
  return request('/people.json');
};

const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const fetchClient = () => {
  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
};

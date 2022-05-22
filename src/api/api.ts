// eslint-disable-next-line max-len
export const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const request = (url: string) => {
  return fetch(`${url}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`),
        );
      }

      return response.json();
    });
};

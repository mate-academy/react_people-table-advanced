export const BASE_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export const request = (url, options) => {
  return fetch(`${BASE_URL}${url}`, options).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    return res.json();
  });
};

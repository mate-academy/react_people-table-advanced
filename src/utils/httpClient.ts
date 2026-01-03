const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';

const httpClient = (url: string) => {
  return fetch(BASE_URL + url).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  });
};

export const client = {
  get: (url: string) => httpClient(url).then(data => data),
};
